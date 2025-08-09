<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <div class="avatar-wrapper">
          <img :src="avatarUrl" :alt="userInfo?.username || '用户头像'" @error="onAvatarError" />
        </div>
        <div class="basic-info">
          <h2>{{ userInfo?.username }}</h2>
          <p>{{ userInfo?.email }}</p>
        </div>
      </div>

      <div class="profile-body">
        <div class="info-row">
          <div class="info-left">
            <span class="info-icon">🆔</span>
            <span class="label">用户ID</span>
          </div>
          <span class="value">{{ userInfo?.id }}</span>
        </div>
        <div class="info-row">
          <div class="info-left">
            <span class="info-icon">👤</span>
            <span class="label">用户名</span>
          </div>
          <span class="value">{{ userInfo?.username }}</span>
        </div>
        <div class="info-row">
          <div class="info-left">
            <span class="info-icon">📧</span>
            <span class="label">邮箱</span>
          </div>
          <span class="value">{{ userInfo?.email }}</span>
        </div>
      </div>

      <div class="profile-actions">
        <button class="btn" @click="goHome">返回首页</button>
        <button class="btn btn-danger" @click="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import userStore from '../stores/userStore'

const router = useRouter()

const userInfo = computed(() => userStore.getUserInfo())
const avatarUrl = computed(() => {
  const name = userInfo.value?.username ?? 'U'
  return userInfo.value?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
})

const onAvatarError = (e: Event) => {
  const img = e.target as HTMLImageElement
  const name = userInfo.value?.username ?? 'U'
  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=128`
  img.onerror = null
}

const goHome = () => router.push('/')
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-container {
  height: calc(100vh - 60px); /* 视口高度减去固定导航栏高度 */
  margin-top: 60px; /* 放在导航栏之下 */
  padding: 16px;
  display: grid;
  place-items: center; /* 水平垂直居中 */
  position: relative;
  overflow: hidden;
}

/* 全屏背景图 */
.profile-container::before {
  content: '';
  position: fixed;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920&auto=format&fit=crop') center/cover no-repeat;
  filter: brightness(0.7);
  z-index: -2;
}

/* 渐变遮罩，提升可读性 */
.profile-container::after {
  content: '';
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 100%);
  z-index: -1;
}

.profile-card {
  width: 100%;
  max-width: 920px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  padding-bottom: 20px;
}

.avatar-wrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #eef2f6;
}

.avatar-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.basic-info h2 {
  margin: 0 0 6px 0;
  font-size: 22px;
  color: #ffffff;
}

.basic-info p {
  margin: 0;
  color: #e5e7eb;
  font-size: 14px;
}

.profile-body {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px 24px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 12px;
  color: #fff;
  backdrop-filter: blur(6px);
}

.info-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-icon {
  font-size: 18px;
}

.label {
  color: #e5e7eb;
  font-size: 14px;
}

.value {
  color: #ffffff;
  font-weight: 700;
}

.profile-actions {
  margin-top: 8px;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 18px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.btn:hover { 
  opacity: 0.95; 
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(59, 130, 246, 0.45);
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
}
</style> 