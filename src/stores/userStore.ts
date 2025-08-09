import { reactive, ref } from 'vue'

// 用户信息接口
interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
}

// 用户状态管理
class UserStore {
  // 用户信息
  userInfo = ref<UserInfo | null>(null)
  
  // 登录状态
  isLoggedIn = ref(false)
  
  // 初始化时从localStorage恢复状态
  constructor() {
    this.initFromStorage()
  }
  
  // 从localStorage恢复状态
  private initFromStorage() {
    const storedUser = localStorage.getItem('userInfo')
    const storedLoginState = localStorage.getItem('isLoggedIn')
    
    if (storedUser && storedLoginState === 'true') {
      this.userInfo.value = JSON.parse(storedUser)
      this.isLoggedIn.value = true
    }
  }
  
  // 登录
  login(userData: UserInfo) {
    this.userInfo.value = userData
    this.isLoggedIn.value = true
    
    // 保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
  }
  
  // 登出
  logout() {
    this.userInfo.value = null
    this.isLoggedIn.value = false
    
    // 清除localStorage
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLoggedIn')
  }
  
  // 获取用户信息
  getUserInfo(): UserInfo | null {
    return this.userInfo.value
  }
  
  // 检查是否已登录
  checkLoginStatus(): boolean {
    return this.isLoggedIn.value
  }
}

// 创建全局实例
const userStore = new UserStore()

export default userStore 