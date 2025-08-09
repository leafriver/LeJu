<template>
  <div class="shipping-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>配送与运费</h1><p>了解配送范围与费用标准。</p></header>
      <section class="content">
        <h2>配送范围</h2>
        <p>核心城市支持次日达，其他地区按物流时效。</p>
        <h2>运费规则</h2>
        <ul>
          <li>满199元包邮（部分偏远地区除外）。</li>
          <li>不满199元，按重量与地区计费。</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.shipping-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 