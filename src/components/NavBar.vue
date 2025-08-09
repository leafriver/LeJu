<template>
  <div class="nav-home">
    <div class="left">
      <router-link to="/" class="logo-link">
        <p>嗨，欢迎来到乐居商城</p>
      </router-link>
    </div>
    <div class="right">
      <router-link to="/cart" class="nav-link">
        <p>我的购物车 <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span></p>
      </router-link>
      
      <!-- 未登录状态 -->
      <template v-if="!userStore.isLoggedIn.value">
        <router-link to="/login" class="nav-link">
          <p>登录</p>
        </router-link>
        <router-link to="/register" class="nav-link">
          <p>注册</p>
        </router-link>
      </template>
      
      <!-- 已登录状态 -->
      <template v-else>
        <div class="user-menu" @mouseenter="openUserMenu" @mouseleave="scheduleCloseUserMenu">
          <div class="user-avatar">
            <img :src="avatarUrl" :alt="userStore.getUserInfo()?.username || '用户头像'" @error="onAvatarError" />
          </div>
          <span class="username">{{ userStore.getUserInfo()?.username }}</span>
          <div class="dropdown-arrow">▼</div>
          
          <!-- 用户下拉菜单 -->
          <div v-if="showUserMenu" class="user-dropdown" @mouseenter="cancelCloseUserMenu" @mouseleave="scheduleCloseUserMenu">
            <router-link to="/profile" class="dropdown-item">
              <span>个人中心</span>
            </router-link>
            <router-link to="/orders" class="dropdown-item">
              <span>我的订单</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item logout-item" @click="handleLogout">
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import userStore from '../stores/userStore'
import cartStore from '../stores/cartStore'

const router = useRouter()
const showUserMenu = ref(false)

// 购物车数量徽标
const cartCount = computed(() => cartStore.totalQuantity.value)

// 计算用户信息与头像地址
const userInfo = computed(() => userStore.getUserInfo())
const avatarUrl = computed(() => {
  const name = userInfo.value?.username ?? 'U'
  // 首选 Dicebear 头像
  return userInfo.value?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
})

// 加载失败时回退到 ui-avatars
const onAvatarError = (evt: Event) => {
  const img = evt.target as HTMLImageElement
  const name = userInfo.value?.username ?? 'U'
  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=128`
  img.onerror = null
}

const openUserMenu = () => {
  showUserMenu.value = true
}

let closeTimer: number | null = null
const scheduleCloseUserMenu = () => {
  if (closeTimer) clearTimeout(closeTimer)
  closeTimer = window.setTimeout(() => {
    showUserMenu.value = false
    closeTimer = null
  }, 180)
}
const cancelCloseUserMenu = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  showUserMenu.value = true
}

const handleLogout = () => {
  userStore.logout()
  showUserMenu.value = false
  router.push('/')
}
</script>

<style scoped>
.nav-home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e; /* 深色背景 */
  padding: 0 40px;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* 阴影提升层次感 */
}

.logo-link {
  text-decoration: none;
}

.left p {
  font-size: 16px;
  color: #f1f1f1;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 60px;
}

.cart-badge {
  display: inline-flex;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  margin-left: 6px;
  border-radius: 9px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  align-items: center;
  justify-content: center;
}

/* 用户菜单样式 */
.user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.user-menu:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.username {
  color: #f1f1f1;
  font-weight: 500;
  font-size: 14px;
}

.dropdown-arrow {
  color: #f1f1f1;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

/* 下拉菜单 */
.user-dropdown {
  position: absolute;
  top: calc(100% - 6px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.dropdown-item:hover {
  background: #eaf4ff; /* 更明显的浅蓝高亮 */
  color: #0b69ff; /* 高亮文字颜色 */
}

/* 登出项维持红色但也有更明显的hover背景 */
.logout-item {
  color: #dc2626;
}
.logout-item:hover {
  background: #ffe5e5; /* 更明显的浅红高亮 */
  color: #b91c1c;
}

.dropdown-item span {
  font-size: 14px;
}

.dropdown-divider {
  height: 1px;
  background: #e1e5e9;
  margin: 4px 0;
}

.logout-item {
  color: #dc2626;
}

.logout-item:hover {
  background: #fee2e2;
}

.right {
  display: flex;
  align-items: center;
  gap: 24px; /* 菜单间距 */
}

/* 统一右侧项目点击区域与高度 */
.right > p,
.right > .nav-link,
.right .user-menu {
  display: flex;
  align-items: center;
  height: 60px; /* 与导航栏一致 */
}

.right p {
  margin: 0;
  color: #f1f1f1;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 60px; /* 文本垂直居中 */
}

/* 悬停时文字颜色变化 */
.right p:hover {
  color: #00c3ff; /* 亮蓝色 */
}

/* 悬停下划线动画 */
.right p::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #00c3ff;
  transition: width 0.3s ease;
}

.right p:hover::after {
  width: 100%;
}

/* 响应式优化 */
@media (max-width: 600px) {
  .nav-home {
    padding: 0 20px;
  }
  .right {
    gap: 15px;
  }
  .left p {
    font-size: 14px;
  }
}
</style>
