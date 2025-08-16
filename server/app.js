const cluster = require('cluster')
const os = require('os')

function startWorker() {
  const express = require('express')
  const cors = require('cors')
  const Redis = require('ioredis')
  const { createFlashSaleRouter } = require('./fsService')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json({ limit: '16kb' }))

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379')

app.use(createFlashSaleRouter(redis))

// 添加商品路由
app.use('/api', productRouter)

// 添加用户认证路由
app.use('/api/auth', userRouter)

  const PORT = process.env.PORT || 3001
  const server = app.listen(PORT, () => {
    console.log(`flash-sale server worker ${process.pid} listening on http://localhost:${PORT}`)
  })

  // Improve keep-alive behavior under load
  server.keepAliveTimeout = Number(process.env.KEEP_ALIVE_TIMEOUT || 65000) // default 5s -> 65s
  server.headersTimeout = Number(process.env.HEADERS_TIMEOUT || 66000)     // should be > keepAliveTimeout
}

const shouldCluster = !(process.env.CLUSTER === '0' || process.env.CLUSTER === 'false')
if (shouldCluster && cluster.isPrimary) {
  const workers = Math.max(1, Number(process.env.WEB_CONCURRENCY || os.cpus().length) || 1)
  console.log(`Starting cluster with ${workers} workers`)
  for (let i = 0; i < workers; i++) cluster.fork()
  cluster.on('exit', (worker) => {
    console.warn(`Worker ${worker.process.pid} exited. Spawning a new one...`)
    cluster.fork()
  })
} else {
  startWorker()
} 