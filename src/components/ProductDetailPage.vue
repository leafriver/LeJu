<template>
  <div class="product-detail-page">
    <NavBar />
    <main class="detail-content">
      <!-- 面包屑导航 -->
      <nav class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span class="separator">/</span>
        <router-link to="/" v-if="product">{{ product.category }}</router-link>
        <span class="separator" v-if="product">/</span>
        <span class="current">{{ product?.title || '商品详情' }}</span>
      </nav>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>正在加载商品详情...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-state">
        <p class="error-message">{{ error }}</p>
        <button @click="loadProduct" class="retry-btn">重试</button>
        <router-link to="/" class="back-btn">返回首页</router-link>
      </div>

      <!-- 商品详情 -->
      <div v-else-if="product" class="product-detail">
        <div class="product-gallery">
          <div class="main-image">
            <img :src="product.image" :alt="product.title" @error="onImgError" />
            <span v-if="product.originalPrice && product.originalPrice > product.price" class="sale-badge">SALE</span>
          </div>
          <div class="image-thumbnails" v-if="productImages.length > 1">
            <div
              v-for="(img, index) in productImages"
              :key="index"
              class="thumbnail"
              :class="{ active: selectedImage === index }"
              @click="selectedImage = index"
            >
              <img :src="img" :alt="`${product.title} - 图片${index + 1}`" />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ product.title }}</h1>
          
          <div class="product-meta">
            <div class="rating">
              <span class="stars">⭐ {{ product.rating.toFixed(1) }}</span>
              <span class="rating-count">({{ Math.floor(Math.random() * 1000) + 100 }} 条评价)</span>
            </div>
            <div class="category">分类：{{ product.category }}</div>
          </div>

          <div class="price-section">
            <div class="current-price">¥{{ product.price.toFixed(2) }}</div>
            <div v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
              ¥{{ product.originalPrice.toFixed(2) }}
            </div>
            <div class="discount" v-if="product.originalPrice && product.originalPrice > product.price">
              节省 ¥{{ (product.originalPrice - product.price).toFixed(2) }}
            </div>
          </div>

          <div class="product-description">
            <h3>商品描述</h3>
            <p>{{ product.description || '暂无描述' }}</p>
          </div>

          <div class="purchase-section">
            <div class="quantity-selector">
              <label for="quantity">数量：</label>
              <div class="quantity-controls">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <input
                  id="quantity"
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  max="99"
                  @input="validateQuantity"
                />
                <button @click="increaseQuantity" :disabled="quantity >= 99">+</button>
              </div>
            </div>

            <div class="action-buttons">
              <button class="add-to-cart-btn" @click="addToCart">
                加入购物车
              </button>
              <button class="buy-now-btn" @click="buyNow">
                立即购买
              </button>
            </div>
          </div>

          <div class="product-features">
            <div class="feature">
              <span class="icon">🚚</span>
              <span>全场满199包邮</span>
            </div>
            <div class="feature">
              <span class="icon">🔄</span>
              <span>7天无理由退换</span>
            </div>
            <div class="feature">
              <span class="icon">⚡</span>
              <span>次日达（覆盖核心城市）</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 相关推荐 -->
      <section class="related-products" v-if="relatedProducts.length > 0">
        <h2>相关推荐</h2>
        <div class="related-grid">
          <div
            v-for="related in relatedProducts"
            :key="related.id"
            class="related-card"
            @click="goToProduct(related.id)"
          >
            <img :src="related.image" :alt="related.title" />
            <h4>{{ related.title }}</h4>
            <div class="related-price">¥{{ related.price.toFixed(2) }}</div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import SiteFooter from './SiteFooter.vue'
import { productApi, type Product } from '../services/api'
import cartStore from '../stores/cartStore'
import userStore from '../stores/userStore'

const route = useRoute()
const router = useRouter()

// 状态管理
const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const quantity = ref(1)
const selectedImage = ref(0)
const relatedProducts = ref<Product[]>([])



// 计算属性：商品图片列表
const productImages = computed(() => {
  if (!product.value) return []
  
  // 主图片 + 生成一些相关图片（实际项目中应该从数据库获取）
  const images = [product.value.image]
  
  // 生成一些相关图片URL（这里使用占位符，实际应该从数据库获取）
  for (let i = 1; i < 4; i++) {
    images.push(`https://picsum.photos/seed/${product.value.id}-${i}/600/400`)
  }
  
  return images
})

// 获取商品详情
async function loadProduct() {
  const productId = route.params.id as string
  if (!productId) {
    error.value = '商品ID无效'
    return
  }

  try {
    loading.value = true
    error.value = null
    
    // 使用新的获取单个商品API
    const response = await productApi.getProductById(productId)
    if (response.success) {
      const apiProduct = response.data
      
      // 转换API数据格式
      product.value = {
        id: apiProduct.id,
        title: apiProduct.name,
        category: apiProduct.category_name || '未分类',
        price: parseFloat(apiProduct.price.toString()),
        originalPrice: apiProduct.is_hot ? parseFloat(apiProduct.price.toString()) * 1.2 : undefined,
        image: apiProduct.main_image,
        rating: 4.0 + Math.random() * 1.0,
        createdAt: new Date(apiProduct.created_at).getTime(),
        description: apiProduct.description
      }
      
      // 加载相关商品
      await loadRelatedProducts()
    } else {
      error.value = response.message || '商品不存在'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载商品失败'
    console.error('加载商品失败:', err)
  } finally {
    loading.value = false
  }
}

// 加载相关商品
async function loadRelatedProducts() {
  if (!product.value) return
  
  try {
    // 这里应该调用获取相关商品的API，暂时使用搜索API模拟
    const response = await productApi.searchProducts(product.value.category, 4, 0)
    if (response.success) {
      relatedProducts.value = response.data
        .filter(item => item.id !== product.value?.id)
        .slice(0, 4)
        .map(item => ({
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
    }
  } catch (err) {
    console.error('加载相关商品失败:', err)
  }
}

// 数量控制
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

function increaseQuantity() {
  if (quantity.value < 99) {
    quantity.value++
  }
}

function validateQuantity() {
  if (quantity.value < 1) quantity.value = 1
  if (quantity.value > 99) quantity.value = 99
}

// 添加到购物车
function addToCart() {
  if (!product.value) return
  
  // 检查登录状态
  if (!userStore.checkLoginStatus()) {
    router.push('/login')
    return
  }
  
  cartStore.addItem({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  }, quantity.value)
  
  // 显示成功提示
  alert('已添加到购物车！')
}

// 立即购买
function buyNow() {
  if (!product.value) return
  
  // 检查登录状态
  if (!userStore.checkLoginStatus()) {
    router.push('/login')
    return
  }
  
  // 先添加到购物车，然后跳转到结算页
  cartStore.addItem({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    image: product.value.image
  }, quantity.value)
  
  router.push('/checkout')
}

// 跳转到其他商品
function goToProduct(productId: string) {
  router.push(`/product/${productId}`)
}

// 图片加载错误处理
function onImgError(e: Event) {
  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/error/600/400`
}

// 监听路由变化
watch(() => route.params.id, () => {
  if (route.params.id) {
    loadProduct()
  }
})

// 组件挂载时加载商品
onMounted(() => {
  loadProduct()
})
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: #f8fafc;
}

.detail-content {
  margin-top: 60px;
  padding: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* 面包屑导航 */
.breadcrumb {
  margin-bottom: 24px;
  padding: 16px 0;
  color: #6b7280;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  margin: 0 8px;
  color: #d1d5db;
}

.current {
  color: #111827;
  font-weight: 600;
}

/* 加载和错误状态 */
.loading-state, .error-state {
  text-align: center;
  padding: 80px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  margin-bottom: 20px;
  color: #ef4444;
  font-size: 16px;
}

.retry-btn, .back-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 8px;
  text-decoration: none;
  display: inline-block;
}

.retry-btn:hover, .back-btn:hover {
  background: #2563eb;
}

/* 商品详情 */
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.product-gallery {
  position: sticky;
  top: 84px;
}

.main-image {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  margin-bottom: 16px;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.sale-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.image-thumbnails {
  display: flex;
  gap: 12px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #3b82f6;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 商品信息 */
.product-info {
  padding: 20px 0;
}

.product-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px;
  line-height: 1.3;
}

.product-meta {
  margin-bottom: 24px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.stars {
  color: #f59e0b;
  font-weight: 600;
}

.rating-count {
  color: #6b7280;
  font-size: 14px;
}

.category {
  color: #6b7280;
  font-size: 14px;
}

.price-section {
  margin-bottom: 32px;
}

.current-price {
  font-size: 32px;
  font-weight: 800;
  color: #ef4444;
  margin-bottom: 8px;
}

.original-price {
  font-size: 18px;
  color: #9ca3af;
  text-decoration: line-through;
  margin-bottom: 8px;
}

.discount {
  color: #059669;
  font-weight: 600;
  font-size: 14px;
}

.product-description {
  margin-bottom: 32px;
}

.product-description h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px;
}

.product-description p {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.purchase-section {
  margin-bottom: 32px;
}

.quantity-selector {
  margin-bottom: 24px;
}

.quantity-selector label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #111827;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 60px;
  height: 36px;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.add-to-cart-btn, .buy-now-btn {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.add-to-cart-btn {
  background: #f3f4f6;
  color: #111827;
  border: 2px solid #d1d5db;
}

.add-to-cart-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.buy-now-btn {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.buy-now-btn:hover {
  filter: brightness(1.1);
}

.product-features {
  display: grid;
  gap: 12px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6b7280;
  font-size: 14px;
}

.icon {
  font-size: 18px;
}

/* 相关推荐 */
.related-products {
  margin-top: 48px;
}

.related-products h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.related-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 280px; /* 固定高度 */
  display: flex;
  flex-direction: column;
}

.related-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.related-card img {
  width: 100%;
  height: 140px; /* 固定图片高度 */
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.related-card:hover img {
  transform: scale(1.05);
}

.related-card h4 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-grow: 1;
}

.related-price {
  color: #ef4444;
  font-weight: 700;
  font-size: 16px;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .product-gallery {
    position: static;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .related-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
  
  .related-card {
    height: 260px;
  }
  
  .related-card img {
    height: 120px;
  }
}

@media (max-width: 480px) {
  .related-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .related-card {
    height: auto;
    min-height: 240px;
  }
}
</style> 