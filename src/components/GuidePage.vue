<template>
  <div class="guide-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>新手指引</h1><p>从注册到下单，快速上手。</p></header>
      <section class="content">
        <ol>
          <li>注册并登录账号。</li>
          <li>搜索并选择心仪商品。</li>
          <li>加入购物车或立即购买。</li>
          <li>填写收货地址并完成支付。</li>
        </ol>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.guide-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 