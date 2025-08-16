<template>
  <section class="flash-sale">
    <div class="fs-head">
      <div class="title-section">
        <h2>🔥 限时秒杀</h2>
        <p class="subtitle">每日10点开抢，限时特惠</p>
      </div>
      <div class="timer" :class="state">
        <span v-if="state==='before'">距开始</span>
        <span v-else-if="state==='running'">距结束</span>
        <span v-else>已结束</span>
        <b v-if="state!=='ended'">{{ timeText }}</b>
      </div>
      <button v-if="isDev" class="seed" @click="seedStocks()">初始化库存(开发)</button>
      <router-link to="/activities" class="view-more-btn">查看更多活动</router-link>
    </div>

    <div class="fs-grid">
      <article v-for="item in items" :key="item.id" class="fs-card">
        <div class="thumb"><img :src="item.image" :alt="item.title" /></div>
        <h3 class="title" :title="item.title">{{ item.title }}</h3>
        <div class="price">
          <span class="current">¥{{ item.flashPrice.toFixed(2) }}</span>
          <span class="orig">¥{{ item.price.toFixed(2) }}</span>
        </div>
        <div class="stock">
          <div class="bar"><span :style="{ width: progress(item) + '%' }"></span></div>
          <small>剩余 {{ remaining(item) }} 件</small>
        </div>
        <button class="buy" :disabled="!canBuy(item)" @click="buy(item)">
          {{ state==='before' ? '未开始' : state==='ended' ? '已结束' : remaining(item) > 0 ? '马上抢' : '已售罄' }}
        </button>
      </article>
    </div>

    <MessageModal
      :visible="toastVisible"
      type="success"
      title="提示"
      :message="toastText"
      @close="toastVisible=false"
      @confirm="toastVisible=false"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import MessageModal from './MessageModal.vue'
import cartStore from '../stores/cartStore'
import catalog from '../stores/catalogStore'
import userStore from '../stores/userStore'

const router = useRouter()

// 活动时间（演示：现在开始，2小时后结束）
const startAt = ref(Date.now())
const endAt = ref(Date.now() + 2 * 60 * 60 * 1000)

const API_BASE = (import.meta as any).env?.VITE_FS_API_BASE || 'http://localhost:3001'
const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
async function seedStocks(){
  try{
    for (const it of items){
      await fetch(`${API_BASE}/fs/init`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ productId: it.id, stock: 50 }) })
    }
    await fetchStocks()
    toast('初始化完成')
  }catch(e){ toast('初始化失败') }
}
function cryptoRandom(){
  // prefer secure uuid if available
  // @ts-ignore
  if (window.crypto && 'randomUUID' in window.crypto) return (window.crypto as any).randomUUID()
  return Math.random().toString(36).slice(2) + Date.now()
}

// 从商品目录中挑选部分做秒杀（示例：前 4 个，首页展示）
const items = reactive(
  catalog.products.value.slice(0, 4).map(p => ({
    id: p.id,
    title: p.title,
    image: p.image,
    price: p.price,
    flashPrice: +(p.price * 0.7).toFixed(2),
    total: 50, // 活动总库存（演示）
  }))
)

// 远程库存：从后端 Redis API 拉取
const stocks = reactive<Record<string, number>>({})

async function fetchStocks(){
  const ids = items.map((it:any)=>it.id).join(',')
  if (!ids) return
  try {
    const resp = await fetch(`${API_BASE}/fs/stock?ids=${encodeURIComponent(ids)}`)
    const data = await resp.json()
    for (const it of items) {
      if (typeof data[it.id] === 'number') stocks[it.id] = data[it.id]
    }
  } catch (e) { /* ignore network errors for polling */ }
}

// 倒计时
const now = ref(Date.now())
let timer: number | null = null
let stocksTimer: number | null = null
onMounted(() => {
  timer = window.setInterval(() => now.value = Date.now(), 1000)
  fetchStocks()
  stocksTimer = window.setInterval(fetchStocks, 2000)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer); if (stocksTimer) clearInterval(stocksTimer) })

const state = computed<'before'|'running'|'ended'>(() => {
  if (now.value < startAt.value) return 'before'
  if (now.value > endAt.value) return 'ended'
  return 'running'
})
const remainMs = computed(() => {
  const t = state.value === 'before' ? startAt.value - now.value : endAt.value - now.value
  return Math.max(0, t)
})
const timeText = computed(() => formatMs(remainMs.value))

function formatMs(ms: number){
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const ss = s % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(ss)}`
}

function remaining(item: any){
  const s = stocks[item.id]
  return typeof s === 'number' ? s : item.total
}
function progress(item: any){
  const left = remaining(item)
  return Math.round(((item.total - left) / item.total) * 100)
}
function canBuy(item: any){
  return state.value === 'running' && remaining(item) > 0
}

// 轻提示
const toastVisible = ref(false)
const toastText = ref('')
function toast(msg: string){ toastText.value = msg; toastVisible.value = true }

async function buy(item: any){
  if (!canBuy(item)) return
  const left = remaining(item)
  if (left <= 0) return toast('已售罄')
  
  // 检查登录状态
  if (!userStore.checkLoginStatus()) {
    // 跳转到登录页面
    router.push('/login')
    return
  }
  
  const info = (userStore.getUserInfo && userStore.getUserInfo()) || null
  const userId = (info && (info.id || info.username || info.email)) || 'guest'
  const reqId = cryptoRandom()
  try {
    const resp = await fetch(`${API_BASE}/fs/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: item.id, qty: 1, userId, reqId, limit: 1 })
    })
    const data = await resp.json()
    if (typeof data.left === 'number') stocks[item.id] = data.left
    if (data.ok) {
      cartStore.addItem({ id: item.id, title: item.title, price: item.flashPrice, image: item.image }, 1)
      toast('已加入购物车，快去结算吧！')
    } else {
      if (data.reason === 'LIMIT') toast('已达每人限购上限')
      else if (data.reason === 'STOCK') toast('已售罄或库存不足')
      else if (data.reason === 'DUPLICATE') toast('重复请求，请稍后再试')
      else toast('抢购失败，请稍后再试')
    }
  } catch (e) {
    toast('网络异常，请稍后再试')
  }
}
</script>

<style scoped>
.flash-sale{ max-width: 1200px; margin: 12px auto 0; padding: 0 20px; }
.fs-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }

.title-section h2{ margin:0; color:#111827; font-size:24px; }

.title-section .subtitle {
  margin: 4px 0 0 0;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}
.timer{ display:flex; align-items:center; gap:8px; color:#6b7280; }
.timer.running b{ color:#ef4444; }

.fs-grid{ display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.fs-card{ background:#fff; border-radius:12px; box-shadow:0 8px 22px rgba(0,0,0,.06); padding:10px; display:flex; flex-direction:column; }
.thumb{ aspect-ratio:4/3; background:#f3f4f6; border-radius:8px; overflow:hidden; }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.title{ margin:10px 4px 6px; font-size:14px; color:#111827; height:42px; overflow:hidden; }
.price{ display:flex; gap:8px; align-items:baseline; padding:0 4px; }
.price .current{ color:#ef4444; font-weight:800; }
.price .orig{ color:#9ca3af; text-decoration:line-through; font-size:12px; }
.stock{ padding:6px 4px; display:flex; align-items:center; gap:8px; }
.bar{ flex:1; height:8px; background:#f1f5f9; border-radius:999px; overflow:hidden; }
.bar span{ display:block; height:100%; background:linear-gradient(135deg,#f43f5e,#fb923c); }
.buy{ height:36px; margin:6px 4px 2px; border:none; border-radius:10px; background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:#fff; font-weight:800; cursor:pointer; }
.buy:disabled{ opacity:.6; cursor:not-allowed; }

.view-more-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}
</style> 