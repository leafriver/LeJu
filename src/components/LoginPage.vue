<template>
  <div class="login-container">
    <!-- 全屏背景插画 -->
    <div class="background-illustration"></div>
    
    <!-- 居中登录窗口 -->
    <div class="login-modal">
      <div class="login-card" role="form" aria-label="登录表单">
        <div class="login-header">
          <h2>欢迎登录</h2>
          <p>请输入您的账号信息</p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              type="text"
              id="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <input
              type="password"
              id="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              required
            />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="loginForm.rememberMe" />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? "登录中..." : "登录" }}
          </button>

          <div class="register-link">
            <p>还没有账号？ <router-link to="/register">立即注册</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import userStore from "../stores/userStore";

const router = useRouter();

const loginForm = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

const isLoading = ref(false);

const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    alert("请填写完整的登录信息");
    return;
  }

  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    console.log("登录信息:", loginForm);
    
    // 模拟登录成功，保存用户信息
    const userData = {
      id: Date.now().toString(),
      username: loginForm.username,
      email: `${loginForm.username}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginForm.username}`
    };
    
    // 保存用户状态
    userStore.login(userData);
    
    router.push("/");
  }, 1500);
};
</script>

<style scoped>
/* 容器布局：全屏背景 + 居中登录窗口 */
.login-container {
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

/* 居中登录窗口 */
.login-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

/* 登录卡片玻璃拟态风格 */
.login-card {
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

.login-card::before {
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
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  opacity: 0.9;
}

/* 表单 */
.login-form {
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

/* 记住我 & 忘记密码 */
.form-options {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
}

.forgot-password {
  color: #fff;
  text-decoration: underline;
  opacity: 0.9;
}

.forgot-password:hover {
  opacity: 1;
}

/* 按钮 */
.login-btn {
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

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 166, 255, 0.6);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 注册链接 */
.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.register-link a {
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

/* 移动端响应式 */
@media (max-width: 768px) {
  .login-modal {
    padding: 10px;
    max-width: 90%;
  }

  .login-card {
    padding: 40px 30px;
    border-radius: 20px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .login-header h2 {
    font-size: 24px;
  }
}
</style>
