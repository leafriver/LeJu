<template>
  <div class="returns-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>售后与退换</h1><p>保障您的购物权益。</p></header>
      <section class="content">
        <h2>退换政策</h2>
        <p>支持7天无理由退换（不影响二次销售）。</p>
        <h2>申请流程</h2>
        <ol>
          <li>在订单详情选择申请售后。</li>
          <li>填写原因并提交凭证。</li>
          <li>等待审核与物流上门取件。</li>
        </ol>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.returns-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 