const express = require('express')

const kStock = pid => `fs:stock:${pid}`
const kUser  = (pid, uid) => `fs:buy:${pid}:${uid}`
const kReq   = reqId => `fs:req:${reqId}`

const LUA_DEC = `
local stockKey = KEYS[1]
local userKey  = KEYS[2]
local limit    = tonumber(ARGV[1])
local qty      = tonumber(ARGV[2])

local stock = tonumber(redis.call('GET', stockKey) or '0')
local bought = tonumber(redis.call('GET', userKey) or '0')

if bought + qty > limit then
  return {0, stock, bought, 'LIMIT'}
end
if stock < qty then
  return {0, stock, bought, 'STOCK'}
end

redis.call('DECRBY', stockKey, qty)
redis.call('INCRBY', userKey, qty)

local newStock = stock - qty
local newBought = bought + qty
return {1, newStock, newBought, ''}
`

function createFlashSaleRouter(redis){
  const router = express.Router()

  let luaSha = null
  async function ensureLuaLoaded(){
    if (luaSha) return luaSha
    luaSha = await redis.script('LOAD', LUA_DEC)
    return luaSha
  }

  async function checkAndSetIdempotency(reqId){
    if (!reqId) return true
    const ok = await redis.set(kReq(reqId), '1', 'NX', 'EX', 30)
    return ok === 'OK'
  }

  router.post('/fs/init', async (req, res) => {
    try {
      const { productId, stock } = req.body || {}
      if (!productId || typeof stock !== 'number') {
        return res.status(400).json({ ok: false, message: 'productId and stock are required' })
      }
      await redis.set(kStock(productId), Math.max(0, Math.floor(stock)))
      return res.json({ ok: true })
    } catch (e) {
      return res.status(500).json({ ok: false, message: e.message })
    }
  })

  router.get('/fs/stock', async (req, res) => {
    try {
      const ids = String(req.query.ids || '').split(',').filter(Boolean)
      if (ids.length === 0) return res.json({})
      const keys = ids.map(kStock)
      const vals = await redis.mget(keys)
      const out = {}
      ids.forEach((id, i) => {
        const v = parseInt(vals[i] || '0', 10)
        out[id] = isNaN(v) ? 0 : v
      })
      return res.json(out)
    } catch (e) {
      return res.status(500).json({ ok: false, message: e.message })
    }
  })

  router.post('/fs/buy', async (req, res) => {
    try {
      const { productId, qty = 1, userId = 'guest', reqId, limit = 1 } = req.body || {}
      if (!productId) return res.status(400).json({ ok: false, message: 'productId required' })

      const okIdem = await checkAndSetIdempotency(reqId)
      if (!okIdem) {
        const left = parseInt(await redis.get(kStock(productId)) || '0', 10)
        const bought = parseInt(await redis.get(kUser(productId, userId)) || '0', 10)
        return res.json({ ok: false, reason: 'DUPLICATE', left, userCount: bought })
      }

      // Ensure LUA loaded and use EVALSHA for performance; fallback to EVAL if NOSCRIPT
      await ensureLuaLoaded()
      let resp
      try {
        resp = await redis.evalsha(luaSha, 2, kStock(productId), kUser(productId, userId), String(limit), String(qty))
      } catch (err) {
        if (String(err && err.message).includes('NOSCRIPT')) {
          luaSha = null
          await ensureLuaLoaded()
          resp = await redis.evalsha(luaSha, 2, kStock(productId), kUser(productId, userId), String(limit), String(qty))
        } else {
          throw err
        }
      }

      const ok = resp[0] === 1
      const left = resp[1]
      const userCount = resp[2]
      const reason = resp[3] || undefined
      return res.json({ ok, left, userCount, reason })
    } catch (e) {
      return res.status(500).json({ ok: false, message: e.message })
    }
  })

  return router
}

module.exports = { createFlashSaleRouter } 