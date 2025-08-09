<template>
  <div class="security-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>账户安全</h1><p>守护您的账户与隐私。</p></header>
      <section class="content">
        <h2>安全建议</h2>
        <ul>
          <li>设置强密码并定期更换。</li>
          <li>启用二次验证。</li>
          <li>谨防钓鱼链接与陌生文件。</li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>
<style scoped>
.security-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px}
.content{background:#fff;margin-top:16px;border-radius:12px;padding:20px;box-shadow:0 8px 22px rgba(0,0,0,.06)}
</style> 