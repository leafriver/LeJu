<template>
  <div class="press-page">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>媒体报道</h1>
        <p>了解乐居商城的最新动态与媒体声音。</p>
      </header>
      <section class="content">
        <ul class="news">
          <li class="item">
            <h3>乐居商城完成B轮融资，持续投入供应链升级</h3>
            <p>2025-08-01｜36Kr</p>
          </li>
          <li class="item">
            <h3>乐居商城用户口碑持续提升，复购率创新高</h3>
            <p>2025-06-30｜TechWeb</p>
          </li>
          <li class="item">
            <h3>次日达网络扩容至更多城市，覆盖率大幅提升</h3>
            <p>2025-05-12｜新浪科技</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<style scoped>
.press-page { background: #f8fafc; min-height: 100vh; }
.container { margin-top: 60px; padding: 24px 20px 40px; max-width: 1200px; margin-inline: auto; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }
.content { background: #fff; margin-top: 16px; border-radius: 12px; padding: 20px; box-shadow: 0 8px 22px rgba(0,0,0,.06); }
.news { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.item { border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
.item h3 { margin: 0 0 6px; color: #111827; font-size: 16px; }
.item p { margin: 0; color: #6b7280; font-size: 13px; }
</style> 