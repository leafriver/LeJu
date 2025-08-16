// API服务 - 管理所有与后端的通信
const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
  pagination?: {
    limit: number;
    offset: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  main_image: string;
  is_hot: number;
  is_new: number;
  created_at: string;
  category_name: string;
}

export interface Category {
  id: number;
  name: string;
  parent_id: number;
  sort_order: number;
  status: number;
}

// 用户相关接口
export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  role: number;
  created_at: string;
  last_login_at?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// 通用API请求函数
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    // 获取token
    const token = localStorage.getItem('token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    
    // 如果有token，添加到请求头
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API请求失败:', error);
    throw error;
  }
}

// 商品相关API
export const productApi = {
  // 获取所有商品
  async getAllProducts(limit: number = 100, offset: number = 0): Promise<ApiResponse<Product[]>> {
    return apiRequest<Product[]>(`/products?limit=${limit}&offset=${offset}`);
  },

  // 按分类获取商品
  async getProductsByCategory(categoryId: number, limit: number = 50, offset: number = 0): Promise<ApiResponse<Product[]>> {
    return apiRequest<Product[]>(`/products/category/${categoryId}?limit=${limit}&offset=${offset}`);
  },

  // 获取热门商品
  async getHotProducts(limit: number = 20): Promise<ApiResponse<Product[]>> {
    return apiRequest<Product[]>(`/products/hot?limit=${limit}`);
  },

  // 获取单个商品详情
  async getProductById(productId: string): Promise<ApiResponse<Product>> {
    return apiRequest<Product>(`/products/${productId}`);
  },

  // 搜索商品
  async searchProducts(keyword: string, limit: number = 50, offset: number = 0): Promise<ApiResponse<Product[]>> {
    return apiRequest<Product[]>(`/products/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}&offset=${offset}`);
  }
};

// 分类相关API
export const categoryApi = {
  // 获取所有分类
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    return apiRequest<Category[]>('/categories');
  }
};

// 用户认证相关API
export const authApi = {
  // 用户注册
  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return apiRequest<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 用户登录
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // 获取用户信息
  async getProfile(): Promise<ApiResponse<User>> {
    return apiRequest<User>('/auth/profile');
  },

  // 更新用户信息
  async updateProfile(updateData: Partial<User>): Promise<ApiResponse<any>> {
    return apiRequest<any>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // 修改密码
  async changePassword(oldPassword: string, newPassword: string): Promise<ApiResponse<any>> {
    return apiRequest<any>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },

  // 验证token
  async verifyToken(token: string): Promise<ApiResponse<any>> {
    return apiRequest<any>('/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
};

export default {
  product: productApi,
  category: categoryApi,
  auth: authApi,
};
