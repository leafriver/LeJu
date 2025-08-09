<template>
  <div class="pay-page alipay">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>支付宝支付</h1>
        <p>请使用支付宝扫描二维码完成支付</p>
      </header>

      <section class="content">
        <div class="order">
          <div>订单号：<b>{{ orderNo }}</b></div>
          <div>应付金额：<b class="amount">¥{{ amount }}</b></div>
        </div>

        <div class="qr-box">
          <img :src="qrSrc" alt="支付二维码" />
          <div class="tip">二维码将在 {{ countdown }}s 后刷新</div>
          <button class="refresh" @click="refreshQr">刷新二维码</button>
          <button class="done" @click="finishPay">我已完成支付</button>
          <router-link class="back" to="/checkout">返回结算</router-link>
        </div>
      </section>
    </main>

    <MessageModal
      :visible="successVisible"
      type="success"
      title="支付成功"
      :message="`订单 ${orderNo} 支付完成，欢迎再次选购！`"
      @close="goHome"
      @confirm="goHome"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../NavBar.vue'
import MessageModal from '../MessageModal.vue'
import cartStore from '../../stores/cartStore'

const route = useRoute()
const router = useRouter()
const orderNo = ref<string>((route.query.order as string) || genOrderNo())
const amount = ref<string>((route.query.amount as string) || '0.00')

const tick = ref<number>(Date.now())
const countdown = ref<number>(30)
let timer: number | null = null

const qrSrc = computed(() => {
  const data = `alipay|order=${orderNo.value}|amount=${amount.value}|ts=${tick.value}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data)}`
})

function genOrderNo() {
  const t = Date.now().toString()
  return `LJ${t.slice(-8)}${Math.floor(Math.random()*90+10)}`
}

function startCycle() {
  stopCycle()
  countdown.value = 30
  timer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      tick.value = Date.now()
      countdown.value = 30
    }
  }, 1000)
}
function stopCycle() {
  if (timer) { clearInterval(timer); timer = null }
}
function refreshQr() {
  tick.value = Date.now()
  countdown.value = 30
}

const successVisible = ref(false)
function finishPay() {
  successVisible.value = true
  cartStore.clear()
}
function goHome() {
  successVisible.value = false
  router.push('/')
}

onMounted(startCycle)
onBeforeUnmount(stopCycle)
</script>

<style scoped>
.pay-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:900px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#1677ff,#3b82f6);color:#fff;border-radius:16px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.12)}
.content{margin-top:16px;background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:20px;display:grid;gap:16px}
.order{display:flex;justify-content:space-between;align-items:center;color:#111827}
.amount{color:#16a34a}
.qr-box{display:grid;justify-items:center;gap:10px}
.qr-box img{width:220px;height:220px;border-radius:12px;background:#f3f4f6}
.tip{color:#64748b}
.done{height:40px;padding:0 16px;border:none;border-radius:10px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:800;cursor:pointer}
.back{color:#2563eb;text-decoration:none}
</style> 