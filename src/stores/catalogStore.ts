import { ref, computed } from 'vue'
import { productApi, categoryApi, type Product as ApiProduct, type Category } from '../services/api'

export interface Product {
  id: string
  title: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  createdAt: number
  description?: string
}

// 状态管理
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// 计算属性：获取顶级分类
const topCategories = computed(() => {
  return categories.value.filter(cat => cat.parent_id === 0)
})

// 获取所有商品
async function fetchProducts(limit: number = 100, offset: number = 0) {
  try {
    loading.value = true
    error.value = null
    
    const response = await productApi.getAllProducts(limit, offset)
    if (response.success) {
      // 转换API数据格式为组件需要的格式
      products.value = response.data.map(item => ({
        id: item.id,
        title: item.name,
        category: item.category_name || '未分类',
        price: parseFloat(item.price.toString()),
        originalPrice: item.is_hot ? parseFloat(item.price.toString()) * 1.2 : undefined,
        image: item.main_image,
        rating: 4.0 + Math.random() * 1.0, // 随机评分，实际项目中应该从数据库获取
        createdAt: new Date(item.created_at).getTime(),
        description: item.description
      }))
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取商品失败'
    console.error('获取商品失败:', err)
  } finally {
    loading.value = false
  }
}

// 按分类获取商品
async function fetchProductsByCategory(categoryId: number, limit: number = 50, offset: number = 0) {
  try {
    loading.value = true
    error.value = null
    
    const response = await productApi.getProductsByCategory(categoryId, limit, offset)
    if (response.success) {
      products.value = response.data.map(item => ({
        id: item.id,
        title: item.name,
        category: item.category_name || '未分类',
        price: parseFloat(item.price.toString()),
        originalPrice: item.is_hot ? parseFloat(item.price.toString()) * 1.2 : undefined,
        image: item.main_image,
        rating: 4.0 + Math.random() * 1.0,
        createdAt: new Date(item.created_at).getTime(),
        description: item.description
      }))
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取分类商品失败'
    console.error('获取分类商品失败:', err)
  } finally {
    loading.value = false
  }
}

// 获取所有分类
async function fetchCategories() {
  try {
    const response = await categoryApi.getAllCategories()
    if (response.success) {
      categories.value = response.data
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '获取分类失败'
    console.error('获取分类失败:', err)
  }
}

// 搜索商品
async function searchProducts(keyword: string, limit: number = 50, offset: number = 0) {
  try {
    loading.value = true
    error.value = null
    
    const response = await productApi.searchProducts(keyword, limit, offset)
    if (response.success) {
      products.value = response.data.map(item => ({
        id: item.id,
        title: item.name,
        category: item.category_name || '未分类',
        price: parseFloat(item.price.toString()),
        originalPrice: item.is_hot ? parseFloat(item.price.toString()) * 1.2 : undefined,
        image: item.main_image,
        rating: 4.0 + Math.random() * 1.0,
        createdAt: new Date(item.created_at).getTime(),
        description: item.description
      }))
    } else {
      error.value = response.message
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '搜索商品失败'
    console.error('搜索商品失败:', err)
  } finally {
    loading.value = false
  }
}

// 获取单个商品
function getById(id: string) {
  return products.value.find(p => p.id === id) || null
}

// 初始化数据
async function initialize() {
  await Promise.all([
    fetchCategories(),
    fetchProducts()
  ])
}

export default {
  // 状态
  products,
  categories,
  topCategories,
  loading,
  error,
  
  // 方法
  fetchProducts,
  fetchProductsByCategory,
  fetchCategories,
  searchProducts,
  getById,
  initialize
}
