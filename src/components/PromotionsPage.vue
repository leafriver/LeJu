<template>
  <div class="promotions-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>优惠政策</h1><p>多重优惠，叠加更划算。</p></header>
      <section class="content">
        <ul>
          <li>新人立减券 / 品类直降</li>
          <li>满减满赠 / 积分抵现</li>
          <li>会员日 / 限时秒杀</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
promotions-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 