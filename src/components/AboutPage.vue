<template>
  <div class="about-page">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>关于我们</h1>
        <p>乐居商城，致力于为用户提供高品质、可信赖的电商体验。</p>
      </header>
      <section class="content">
        <h2>我们的使命</h2>
        <p>严选好物，服务用户，打造可信赖的品质生活平台。</p>
        <h2>我们的团队</h2>
        <p>由一群热爱产品与服务的伙伴组成，覆盖商品、物流、技术与客服等核心能力。</p>
        <h2>我们的价值观</h2>
        <ul>
          <li>以用户为中心</li>
          <li>长期主义</li>
          <li>诚实守信</li>
          <li>持续创新</li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<style scoped>
.about-page { background: #f8fafc; min-height: 100vh; }
.container { margin-top: 60px; padding: 24px 20px 40px; max-width: 1200px; margin-inline: auto; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }
.hero h1 { margin: 0 0 8px; }
.content { background: #fff; margin-top: 16px; border-radius: 12px; padding: 20px; box-shadow: 0 8px 22px rgba(0,0,0,.06); }
.content h2 { margin: 12px 0 8px; color: #111827; }
.content p, .content li { color: #374151; }
</style> 