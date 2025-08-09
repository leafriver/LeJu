<template>
  <div class="careers-page">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>加入我们</h1>
        <p>和优秀的伙伴一起，打造更好的电商体验。</p>
      </header>
      <section class="content">
        <h2>开放职位</h2>
        <ul class="jobs">
          <li class="job">
            <h3>前端工程师（Vue）</h3>
            <p>负责商城前端页面开发与性能优化，推进组件化与工程化建设。</p>
          </li>
          <li class="job">
            <h3>后端工程师（Node/Java）</h3>
            <p>建设电商核心服务与接口，保障稳定与扩展性。</p>
          </li>
          <li class="job">
            <h3>商品运营</h3>
            <p>负责商品品类规划、活动策划与数据分析。</p>
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
.careers-page { background: #f8fafc; min-height: 100vh; }
.container { margin-top: 60px; padding: 24px 20px 40px; max-width: 1200px; margin-inline: auto; }
.hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }
.content { background: #fff; margin-top: 16px; border-radius: 12px; padding: 20px; box-shadow: 0 8px 22px rgba(0,0,0,.06); }
.jobs { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.job { border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px; }
.job h3 { margin: 0 0 6px; color: #111827; }
.job p { margin: 0; color: #374151; }
</style> 