<template>
  <footer class="site-footer" @click="onFooterClick">
    <!-- 顶部服务条 -->
    <div class="service-bar">
      <div class="service-item">📦 次日达 <span>核心城市覆盖</span></div>
      <div class="service-item">🔄 7天无理由 <span>售后无忧</span></div>
      <div class="service-item">🔒 正品保障 <span>严格质检</span></div>
      <div class="service-item">🛡 安全支付 <span>多重加密</span></div>
    </div>

    <!-- 主体多列信息 -->
    <div class="footer-main">
      <div class="col">
        <h4>关于我们</h4>
        <ul>
          <li><router-link to="/about">企业介绍</router-link></li>
          <li><router-link to="/careers">加入我们</router-link></li>
          <li><a href="#" @click.prevent="openContactQuick">联系我们</a></li>
          <li><router-link to="/press">媒体报道</router-link></li>
        </ul>
      </div>
      <div class="col">
        <h4>客户服务</h4>
        <ul>
          <li><router-link to="/help">帮助中心</router-link></li>
          <li><router-link to="/shipping">配送与运费</router-link></li>
          <li><router-link to="/returns">售后与退换</router-link></li>
          <li><router-link to="/invoice">发票制度</router-link></li>
        </ul>
      </div>
      <div class="col">
        <h4>购物指南</h4>
        <ul>
          <li><router-link to="/guide">新手指引</router-link></li>
          <li><router-link to="/security">账户安全</router-link></li>
          <li><router-link to="/payment">支付方式</router-link></li>
          <li><router-link to="/promotions">优惠政策</router-link></li>
        </ul>
      </div>
      <div class="col subscribe">
        <h4>订阅优惠</h4>
        <p>订阅邮件，获取最新活动与专属优惠</p>
        <div class="subscribe-bar">
          <input v-model="email" type="email" placeholder="输入邮箱地址" @keyup.enter="subscribe" />
          <button @click="subscribe">订阅</button>
        </div>
        <div class="socials">
          <a href="#" aria-label="WeChat">🟩</a>
          <a href="#" aria-label="Weibo">🟥</a>
          <a href="#" aria-label="Douyin">⬛</a>
        </div>
      </div>
    </div>

    <!-- 版权栏 -->
    <div class="footer-bottom">
      <div class="legal">
        <a href="#">隐私政策</a>
        <span class="dot">·</span>
        <a href="#">用户协议</a>
        <span class="dot">·</span>
        <a href="#">Cookie政策</a>
      </div>
      <div class="copy">© {{ year }} 乐居商城 Leju Mall. All rights reserved.</div>
    </div>
    <!-- 联系我们模态框 -->
    <MessageModal
      :visible="showContact"
      type="info"
      :title="contactTitle"
      :message="contactText"
      @confirm="closeContact"
      @close="closeContact"
    />
  </footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MessageModal from './MessageModal.vue'
const email = ref('')
const year = new Date().getFullYear()

function subscribe() {
  if (!email.value) return
  console.log('订阅邮箱：', email.value)
  email.value = ''
}

function onFooterClick(e: Event) {
  const target = e.target as HTMLElement
  const anchor = target.closest('a') as HTMLAnchorElement | null
  if (anchor && anchor.getAttribute('href') === '#') {
    e.preventDefault()
  }
}

const showContact = ref(false)
const contactTitle = '联系我们'
const contactText = '客服热线：400-800-1234\n企业邮箱：support@lejumall.com\n工作时间：9:00-21:00'

function openContactQuick() {
  showContact.value = true
}
function closeContact() {
  showContact.value = false
}
</script>

<style scoped>
.site-footer { background: #0f172a; color: #cbd5e1; margin-top: 24px; }

.service-bar { max-width: 1200px; margin: 0 auto; padding: 18px 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.service-item { background: #0b1224; border: 1px solid #1e293b; border-radius: 10px; padding: 12px 14px; font-weight: 600; color: #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
.service-item span { color: #94a3b8; font-weight: 400; }

.footer-main { max-width: 1200px; margin: 0 auto; padding: 24px 20px 10px; display: grid; grid-template-columns: 1.2fr 1fr 1fr 1.4fr; gap: 24px; }
.col h4 { margin: 0 0 12px; color: #e2e8f0; font-size: 16px; }
.col ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 8px; }
.col a { color: #94a3b8; text-decoration: none; }
.col a:hover { color: #e2e8f0; }

.subscribe p { margin: 0 0 10px; color: #94a3b8; }
.subscribe-bar { display: flex; gap: 8px; }
.subscribe-bar input { flex: 1; height: 40px; border-radius: 8px; border: 1px solid #334155; background: #0b1224; color: #e2e8f0; padding: 0 12px; outline: none; }
.subscribe-bar button { height: 40px; padding: 0 14px; border-radius: 8px; border: none; background: #22d3ee; color: #0b1224; font-weight: 800; cursor: pointer; }

.socials { display: flex; gap: 10px; margin-top: 10px; }
.socials a { display: inline-flex; width: 28px; height: 28px; align-items: center; justify-content: center; background: #0b1224; border: 1px solid #334155; border-radius: 6px; color: #e2e8f0; text-decoration: none; }
.socials a:hover { filter: brightness(1.2); }

.footer-bottom { border-top: 1px solid #1e293b; margin-top: 8px; padding: 14px 20px; display: grid; gap: 8px; max-width: 1200px; margin-left: auto; margin-right: auto; }
.legal { display: flex; gap: 10px; flex-wrap: wrap; }
.legal a { color: #94a3b8; text-decoration: none; }
.legal a:hover { color: #e2e8f0; }
.copy { color: #64748b; font-size: 13px; }

@media (max-width: 1024px) {
  .service-bar { grid-template-columns: repeat(2, 1fr); }
  .footer-main { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .service-bar { grid-template-columns: 1fr; }
  .footer-main { grid-template-columns: 1fr; }
}
</style> 