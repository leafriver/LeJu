<template>
  <div class="contact-page">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>联系我们</h1>
        <p>我们愿意倾听您的建议与需求。</p>
      </header>
      <section class="content">
        <div class="grid">
          <div class="card">
            <h3>联系方式</h3>
            <ul class="info">
              <li>客服热线：400-800-1234（9:00-21:00）</li>
              <li>企业邮箱：support@lejumall.com</li>
              <li>地址：上海市浦东新区世纪大道100号</li>
            </ul>
          </div>
          <div class="card">
            <h3>地图位置</h3>
            <div class="map-placeholder">地图占位</div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<style scoped>
.contact-page { background: #f8fafc; min-height: 100vh; }
.container { margin-top: 60px; padding: 24px 20px 40px; max-width: 1200px; margin-inline: auto; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }
.content { background: #fff; margin-top: 16px; border-radius: 12px; padding: 20px; box-shadow: 0 8px 22px rgba(0,0,0,.06); }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
.card h3 { margin: 0 0 10px; }
.map-placeholder { height: 260px; background: #f3f4f6; border: 1px dashed #cbd5e1; border-radius: 8px; display: grid; place-items: center; color: #64748b; }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
</style> 