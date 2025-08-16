import { reactive, ref } from 'vue'
import { authApi } from '../services/api'

// 用户信息接口
interface UserInfo {
  id: string
  username: string
  email?: string
  phone?: string
  role: number
  created_at: string
  last_login_at?: string
}

// 用户状态管理
class UserStore {
  // 用户信息
  userInfo = ref<UserInfo | null>(null)
  
  // 登录状态
  isLoggedIn = ref(false)
  
  // JWT token
  token = ref<string | null>(null)
  
  // 初始化时从localStorage恢复状态
  constructor() {
    this.initFromStorage()
  }
  
  // 从localStorage恢复状态
  private initFromStorage() {
    const storedUser = localStorage.getItem('userInfo')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      this.userInfo.value = JSON.parse(storedUser)
      this.token.value = storedToken
      this.isLoggedIn.value = true
    }
  }
  
  // 登录
  async login(username: string, password: string) {
    try {
      const response = await authApi.login({ username, password })
      
      if (response.success) {
        this.userInfo.value = response.data.user
        this.token.value = response.data.token
        this.isLoggedIn.value = true
        
        // 保存到localStorage
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        
        return { success: true, message: '登录成功' }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('登录失败:', error)
      return { success: false, message: '登录失败，请检查网络连接' }
    }
  }
  
  // 注册
  async register(userData: { username: string; password: string; email?: string; phone?: string }) {
    try {
      const response = await authApi.register(userData)
      
      if (response.success) {
        return { success: true, message: '注册成功，请登录' }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('注册失败:', error)
      return { success: false, message: '注册失败，请检查网络连接' }
    }
  }
  
  // 登出
  logout() {
    this.userInfo.value = null
    this.token.value = null
    this.isLoggedIn.value = false
    
    // 清除localStorage
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
  }
  
  // 获取用户信息
  getUserInfo(): UserInfo | null {
    return this.userInfo.value
  }
  
  // 获取token
  getToken(): string | null {
    return this.token.value
  }
  
  // 检查是否已登录
  checkLoginStatus(): boolean {
    return this.isLoggedIn.value
  }
  
  // 更新用户信息
  async updateProfile(updateData: Partial<UserInfo>) {
    try {
      const response = await authApi.updateProfile(updateData)
      
      if (response.success) {
        // 更新本地用户信息
        if (this.userInfo.value) {
          this.userInfo.value = { ...this.userInfo.value, ...updateData }
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo.value))
        }
        return { success: true, message: '用户信息更新成功' }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return { success: false, message: '更新失败，请检查网络连接' }
    }
  }
  
  // 修改密码
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const response = await authApi.changePassword(oldPassword, newPassword)
      return response
    } catch (error) {
      console.error('修改密码失败:', error)
      return { success: false, message: '修改失败，请检查网络连接' }
    }
  }
}

// 创建全局实例
const userStore = new UserStore()

export default userStore 