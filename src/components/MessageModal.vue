<template>
  <div v-if="visible" class="message-modal-overlay" @click="handleOverlayClick">
    <div class="message-modal" @click.stop>
      <button class="modal-close" @click="handleCloseClick" aria-label="关闭">×</button>
      <div class="message-icon">
        <div v-if="type === 'error'" class="error-icon">✕</div>
        <div v-else-if="type === 'success'" class="success-icon">✓</div>
        <div v-else class="info-icon">ℹ</div>
      </div>
      <div class="message-content">
        <h3 class="message-title">{{ title }}</h3>
        <p class="message-text">{{ message }}</p>
      </div>
      <!-- 去掉底部按钮，改为右上角关闭 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

interface Props {
  visible: boolean
  type?: 'success' | 'error' | 'info'
  title: string
  message: string
  confirmText?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  confirmText: '确定'
})

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleOverlayClick = () => {
  emit('close')
}

const handleCloseClick = () => {
  emit('close')
}
</script>

<style scoped>
.message-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.message-modal {
  position: relative;
  background: white;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: messageSlideIn 0.3s ease;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.modal-close:hover { background: #f3f4f6; color: #111827; }

.message-icon {
  margin-bottom: 20px;
}

.message-icon > div {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
}

.error-icon {
  background: #fee2e2;
  color: #dc2626;
}

.success-icon {
  background: #dcfce7;
  color: #16a34a;
}

.info-icon {
  background: #dbeafe;
  color: #2563eb;
}

.message-content {
  margin-bottom: 24px;
}

.message-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.message-text {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.message-actions {
  display: flex;
  justify-content: center;
}

.message-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.message-btn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .message-modal {
    max-width: 90%;
    padding: 24px 20px;
  }
}
</style> 