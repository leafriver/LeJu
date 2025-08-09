<template>
  <div class="help-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>帮助中心</h1><p>常见问题与使用指南。</p></header>
      <section class="content">
        <h2>常见问题</h2>
        <ul>
          <li>如何下单？如何取消订单？</li>
          <li>如何查看物流信息？</li>
          <li>如何申请售后？</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.help-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 