<template>
  <div class="register-container">
    <!-- 全屏背景插画 -->
    <div class="background-illustration"></div>
    
    <!-- 居中注册窗口 -->
    <div class="register-modal">
      <div class="register-card" role="form" aria-label="注册表单">
        <div class="register-header">
          <h2>欢迎注册</h2>
          <p>创建您的账号，开始购物之旅</p>
        </div>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              v-model="registerForm.username"
              placeholder="请输入用户名"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">邮箱</label>
            <input
              type="email"
              id="email"
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              placeholder="请再次输入密码"
              required
            />
          </div>

          <div class="form-options">
            <label class="agree-terms">
              <input type="checkbox" v-model="registerForm.agreeTerms" />
              <span>我已阅读并同意 <a href="#" @click.prevent="showTerms" class="terms-link">服务条款</a></span>
            </label>
          </div>

          <!-- 服务条款弹窗 -->
          <div v-if="isTermsVisible" class="terms-modal-overlay" @click="closeTerms">
            <div class="terms-modal" @click.stop>
              <div class="terms-header">
                <h3>服务条款</h3>
                <button class="close-btn" @click="closeTerms" :disabled="!canCloseTerms">
                  {{ canCloseTerms ? '×' : `${remainingTime}s` }}
                </button>
              </div>
              <div class="terms-content">
                <h4>乐居商城服务条款</h4>
                <p><strong>第一条 总则</strong></p>
                <p>欢迎使用乐居商城！本服务条款是您与乐居商城之间就使用我们的服务所达成的协议。</p>
                
                <p><strong>第二条 服务内容</strong></p>
                <p>乐居商城为用户提供在线购物服务，包括但不限于商品浏览、购买、支付、配送等服务。</p>
                
                <p><strong>第三条 用户责任</strong></p>
                <p>用户在使用服务时应遵守相关法律法规，不得从事违法违规活动。用户应妥善保管账号信息，对账号下的所有活动承担责任。</p>
                
                <p><strong>第四条 隐私保护</strong></p>
                <p>我们重视用户隐私保护，承诺依法收集、使用和保护用户个人信息，不会向第三方泄露用户隐私信息。</p>
                
                <p><strong>第五条 知识产权</strong></p>
                <p>乐居商城的所有内容，包括但不限于文字、图片、音频、视频、软件、程序、版面设计等，均受知识产权法保护。</p>
                
                <p><strong>第六条 免责声明</strong></p>
                <p>在法律法规允许的范围内，乐居商城不对因不可抗力、网络故障、系统维护等原因造成的服务中断承担责任。</p>
                
                <p><strong>第七条 协议修改</strong></p>
                <p>乐居商城保留随时修改本服务条款的权利，修改后的条款将在网站公布，继续使用服务即表示接受修改后的条款。</p>
                
                <p><strong>第八条 争议解决</strong></p>
                <p>本协议的订立、执行和解释及争议的解决均应适用中国法律。如发生争议，双方应友好协商解决。</p>
              </div>
            </div>
          </div>

          <button type="submit" class="register-btn" :disabled="isLoading">
            {{ isLoading ? "注册中..." : "立即注册" }}
          </button>

          <div class="login-link">
            <p>已有账号？ <router-link to="/login">立即登录</router-link></p>
          </div>
        </form>
      </div>
    </div>

    <!-- 消息弹窗 -->
    <MessageModal
      :visible="isMessageVisible"
      :type="messageType"
      :title="messageTitle"
      :message="messageText"
      @confirm="closeMessage"
      @close="closeMessage"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import MessageModal from "./MessageModal.vue";

const router = useRouter();

const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const isLoading = ref(false);

// 服务条款弹窗相关状态
const isTermsVisible = ref(false);
const canCloseTerms = ref(false);
const remainingTime = ref(5);
let termsTimer: number | null = null;

// 消息弹窗相关状态
const isMessageVisible = ref(false);
const messageType = ref<'success' | 'error' | 'info'>('info');
const messageTitle = ref('');
const messageText = ref('');

const showTerms = () => {
  isTermsVisible.value = true;
  canCloseTerms.value = false;
  remainingTime.value = 5;
  
  // 5秒倒计时
  termsTimer = window.setInterval(() => {
    remainingTime.value--;
    if (remainingTime.value <= 0) {
      canCloseTerms.value = true;
      if (termsTimer) {
        clearInterval(termsTimer);
        termsTimer = null;
      }
    }
  }, 1000);
};

const closeTerms = () => {
  if (!canCloseTerms.value) return;
  
  isTermsVisible.value = false;
  if (termsTimer) {
    clearInterval(termsTimer);
    termsTimer = null;
  }
};

const showMessage = (type: 'success' | 'error' | 'info', title: string, message: string) => {
  messageType.value = type;
  messageTitle.value = title;
  messageText.value = message;
  isMessageVisible.value = true;
};

const closeMessage = () => {
  isMessageVisible.value = false;
};

const handleRegister = async () => {
  // 表单验证
  if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
    showMessage('error', '注册失败', '请填写完整的注册信息');
    return;
  }

  if (registerForm.password !== registerForm.confirmPassword) {
    showMessage('error', '注册失败', '两次输入的密码不一致');
    return;
  }

  if (!registerForm.agreeTerms) {
    showMessage('error', '注册失败', '请阅读并同意服务条款');
    return;
  }

  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerForm.email)) {
    showMessage('error', '注册失败', '请输入有效的邮箱地址');
    return;
  }

  // 密码强度验证
  if (registerForm.password.length < 6) {
    showMessage('error', '注册失败', '密码长度至少为6位');
    return;
  }

  isLoading.value = true;
  
  // 模拟注册请求
  setTimeout(() => {
    isLoading.value = false;
    console.log("注册信息:", registerForm);
    showMessage('success', '注册成功', '注册成功！请登录您的账号');
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }, 1500);
};
</script>

<style scoped>
/* 容器布局：全屏背景 + 居中注册窗口 */
.register-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow: hidden;
}

/* 全屏背景插画 */
.background-illustration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1920&q=80")
    center center / cover no-repeat;
  filter: brightness(0.7);
  z-index: 1;
}

/* 居中注册窗口 */
.register-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

/* 注册卡片玻璃拟态风格 */
.register-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  padding: 50px 40px;
  width: 100%;
  color: #fff;
  animation: fadeIn 0.8s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.register-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  z-index: -1;
}

/* 标题 */
.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.register-header p {
  font-size: 14px;
  opacity: 0.9;
}

/* 表单 */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 4px;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  box-shadow: 0 0 0 2px #66a6ff;
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
}

/* 服务条款 */
.form-options {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
}

.agree-terms {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #fff;
  cursor: pointer;
  line-height: 1.4;
}

.agree-terms input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #66a6ff;
  margin-top: 2px;
}

.terms-link {
  color: #66a6ff;
  text-decoration: underline;
}

.terms-link:hover {
  opacity: 0.8;
}

/* 按钮 */
.register-btn {
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 166, 255, 0.6);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 登录链接 */
.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #fff;
  text-decoration: underline;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 服务条款弹窗样式 */
.terms-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.terms-modal {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

.terms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e1e5e9;
  background: #f8f9fa;
}

.terms-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover:not(:disabled) {
  background: #e1e5e9;
  color: #333;
}

.close-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

.terms-content {
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
}

.terms-content h4 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.terms-content p {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.terms-content strong {
  color: #333;
  font-weight: 600;
}

/* 弹窗动画 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .register-modal {
    padding: 10px;
    max-width: 90%;
  }

  .register-card {
    padding: 40px 30px;
    border-radius: 20px;
  }
  
  .register-header h2 {
    font-size: 24px;
  }
  
  .terms-modal {
    max-width: 95%;
    max-height: 85vh;
  }
  
  .terms-content {
    padding: 20px;
  }
}
</style> 