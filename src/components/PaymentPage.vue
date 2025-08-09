<template>
  <div class="payment-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>支付方式</h1><p>支持多种支付渠道。</p></header>
      <section class="content">
        <ul>
          <li>支付宝 / 微信支付</li>
          <li>银行卡（借记卡/信用卡）</li>
          <li>货到付款（部分城市）</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.payment-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 