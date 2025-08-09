<template>
  <div class="invoice-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>发票制度</h1><p>支持电子发票，满足企业报销需求。</p></header>
      <section class="content">
        <h2>开票类型</h2>
        <ul>
          <li>增值税电子普通发票。</li>
          <li>增值税专用发票（条件开具）。</li>
        </ul>
        <h2>开票说明</h2>
        <p>下单时选择“需要发票”，按提示填写抬头信息。</p>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.invoice-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 