// Simple load test for flash-sale API (CommonJS)
// Usage examples:
//   node server/loadtest.js --url http://localhost:3001/fs/buy --n 1000 --c 200 --product 1 --qty 1 --limit 999 --multi false --init 50
//   node server/loadtest.js --n 2000 --c 300 --product 1 --multi true --limit 1

const http = require('http')
const https = require('https')

const keepAliveHttpAgent = new http.Agent({ keepAlive: true, maxSockets: Infinity })
const keepAliveHttpsAgent = new https.Agent({ keepAlive: true, maxSockets: Infinity })

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {
    url: 'http://localhost:3001/fs/buy',
    stockUrl: 'http://localhost:3001/fs/stock',
    initUrl: 'http://localhost:3001/fs/init',
    n: 1000,
    c: 200,
    product: '1',
    qty: 1,
    limit: 999,
    multi: false,
    init: 0,
  }
  for (let i = 0; i < args.length; i++) {
    const k = args[i]
    const v = args[i + 1]
    switch (k) {
      case '--url': out.url = v; i++; break
      case '--stockUrl': out.stockUrl = v; i++; break
      case '--initUrl': out.initUrl = v; i++; break
      case '--n': out.n = parseInt(v, 10); i++; break
      case '--c': out.c = parseInt(v, 10); i++; break
      case '--product': out.product = v; i++; break
      case '--qty': out.qty = parseInt(v, 10); i++; break
      case '--limit': out.limit = parseInt(v, 10); i++; break
      case '--multi': out.multi = v === 'true'; i++; break
      case '--init': out.init = parseInt(v, 10); i++; break
      default: break
    }
  }
  return out
}

function doRequest(url, bodyBuf) {
  return new Promise((resolve) => {
    const isHttps = url.startsWith('https:')
    const lib = isHttps ? https : http
    const agent = isHttps ? keepAliveHttpsAgent : keepAliveHttpAgent
    const u = new URL(url)
    const options = {
      hostname: u.hostname,
      port: u.port || (isHttps ? 443 : 80),
      path: u.pathname + (u.search || ''),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': bodyBuf.length,
        'Connection': 'keep-alive',
      },
      timeout: 10000,
      agent,
    }
    const t0 = process.hrtime.bigint()
    const req = lib.request(options, (res) => {
      let chunks = []
      res.on('data', (d) => chunks.push(d))
      res.on('end', () => {
        const t1 = process.hrtime.bigint()
        const ms = Number(t1 - t0) / 1e6
        const buf = Buffer.concat(chunks)
        try {
          const json = JSON.parse(buf.toString('utf8') || '{}')
          resolve({ ok: json.ok === true, ms, json })
        } catch (e) {
          resolve({ ok: false, ms, json: { reason: 'PARSE' } })
        }
      })
    })
    req.on('error', () => {
      const t1 = process.hrtime.bigint()
      const ms = Number(t1 - t0) / 1e6
      resolve({ ok: false, ms, json: { reason: 'NETWORK' } })
    })
    req.end(bodyBuf)
  })
}

async function initStock(initUrl, product, stock) {
  if (!stock || stock <= 0) return
  const body = JSON.stringify({ productId: product, stock })
  const u = new URL(initUrl)
  const isHttps = u.protocol === 'https:'
  const lib = isHttps ? https : http
  const agent = isHttps ? keepAliveHttpsAgent : keepAliveHttpAgent
  const options = {
    hostname: u.hostname,
    port: u.port || (isHttps ? 443 : 80),
    path: u.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'Connection': 'keep-alive',
    },
    agent,
  }
  await new Promise((resolve) => {
    const req = lib.request(options, (res) => { res.on('data', ()=>{}); res.on('end', resolve) })
    req.on('error', resolve)
    req.end(body)
  })
}

async function run() {
  const cfg = parseArgs()
  if (cfg.init > 0) {
    console.log(`[init] set stock product=${cfg.product} stock=${cfg.init}`)
    await initStock(cfg.initUrl, cfg.product, cfg.init)
  }

  const total = cfg.n
  const conc = Math.max(1, cfg.c)
  let inFlight = 0
  let launched = 0
  let completed = 0
  let okCount = 0
  let sumMs = 0
  const latencies = new Float64Array(total)

  function nextUserId(i) { return cfg.multi ? `u${i+1}` : 'u1' }

  const start = Date.now()
  await new Promise((resolve) => {
    function launchMore() {
      while (inFlight < conc && launched < total) {
        const i = launched++
        inFlight++
        const bodyObj = {
          productId: cfg.product,
          qty: cfg.qty,
          userId: nextUserId(i),
          limit: cfg.limit,
        }
        const bodyBuf = Buffer.from(JSON.stringify(bodyObj))
        doRequest(cfg.url, bodyBuf).then((res) => {
          completed++
          inFlight--
          if (res.ok) okCount++
          sumMs += res.ms
          latencies[completed - 1] = res.ms
          if (completed === total) return resolve(null)
          launchMore()
        })
      }
    }
    launchMore()
  })
  const elapsed = Date.now() - start
  const avgMs = total > 0 ? (sumMs / total) : 0
  const succRate = total > 0 ? ((okCount / total) * 100) : 0
  const rps = elapsed > 0 ? (total / (elapsed / 1000)) : 0

  // p95/p99
  const sorted = Array.from(latencies).sort((a,b)=>a-b)
  const pick = (p) => sorted[Math.min(sorted.length - 1, Math.floor((p/100) * sorted.length))] || 0
  const p95 = pick(95)
  const p99 = pick(99)

  console.log(`\n=== Load Test Result ===`)
  console.log(`requests: ${total}, concurrency: ${conc}`)
  console.log(`success: ${okCount}, successRate: ${succRate.toFixed(2)}%`)
  console.log(`avgLatency: ${avgMs.toFixed(2)} ms, p95: ${p95.toFixed(2)} ms, p99: ${p99.toFixed(2)} ms`)
  console.log(`duration: ${elapsed} ms, throughput: ${rps.toFixed(2)} req/s`)
}

run().catch(err => { console.error(err); process.exit(1) }) 