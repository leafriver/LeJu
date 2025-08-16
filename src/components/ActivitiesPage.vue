<template>
  <div class="activities-page">
    <NavBar />
    <main class="activities-content">
      <!-- 页面标题 -->
      <section class="page-header">
        <div class="container">
          <h1>活动中心</h1>
          <p>精彩活动，等你来抢！</p>
        </div>
      </section>

      <!-- 活动分类导航 -->
      <section class="activity-nav">
        <div class="container">
          <div class="nav-tabs">
            <button
              v-for="category in activityCategories"
              :key="category.id"
              :class="['nav-tab', { active: selectedCategory === category.id }]"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </section>

      <!-- 活动内容 -->
      <section class="activities-section">
        <div class="container">
          <!-- 限时秒杀 -->
          <div v-if="selectedCategory === 'flash-sale'" class="activity-block">
            <div class="block-header">
              <h2>🔥 限时秒杀</h2>
              <div class="countdown">
                <span>距离结束还有：</span>
                <div class="time-display">
                  <span class="time-unit">{{ countdown.hours }}</span>
                  <span class="time-separator">:</span>
                  <span class="time-unit">{{ countdown.minutes }}</span>
                  <span class="time-separator">:</span>
                  <span class="time-unit">{{ countdown.seconds }}</span>
                </div>
              </div>
            </div>
            
            <div class="flash-sale-grid">
              <div v-for="item in flashSaleItems" :key="item.id" class="flash-sale-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                  <div class="discount-badge">{{ item.discount }}折</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="price-info">
                    <span class="current-price">¥{{ item.currentPrice }}</span>
                    <span class="original-price">¥{{ item.originalPrice }}</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: item.soldPercentage + '%' }"></div>
                  </div>
                  <div class="stock-info">
                    已售{{ item.soldCount }}/{{ item.totalStock }}
                  </div>
                  <button class="buy-now-btn" @click="buyNow(item)">立即抢购</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 新品首发 -->
          <div v-if="selectedCategory === 'new-arrival'" class="activity-block">
            <div class="block-header">
              <h2>🆕 新品首发</h2>
              <p>最新上架，抢先体验</p>
            </div>
            
            <div class="new-arrival-grid">
              <div v-for="item in newArrivalItems" :key="item.id" class="new-arrival-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                  <div class="new-badge">NEW</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-desc">{{ item.description }}</p>
                  <div class="price-info">
                    <span class="current-price">¥{{ item.price }}</span>
                    <span class="early-bird">早鸟价</span>
                  </div>
                  <button class="preview-btn" @click="previewItem(item)">抢先预览</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 清仓特卖 -->
          <div v-if="selectedCategory === 'clearance'" class="activity-block">
            <div class="block-header">
              <h2>💥 清仓特卖</h2>
              <p>库存有限，先到先得</p>
            </div>
            
            <div class="clearance-grid">
              <div v-for="item in clearanceItems" :key="item.id" class="clearance-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                  <div class="clearance-badge">清仓</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="price-info">
                    <span class="current-price">¥{{ item.currentPrice }}</span>
                    <span class="original-price">¥{{ item.originalPrice }}</span>
                  </div>
                  <div class="stock-warning">
                    仅剩{{ item.remainingStock }}件
                  </div>
                  <button class="buy-now-btn" @click="buyNow(item)">立即购买</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 品牌特卖 -->
          <div v-if="selectedCategory === 'brand-sale'" class="activity-block">
            <div class="block-header">
              <h2>🏷️ 品牌特卖</h2>
              <p>知名品牌，限时特惠</p>
            </div>
            
            <div class="brand-sale-grid">
              <div v-for="item in brandSaleItems" :key="item.id" class="brand-sale-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                  <div class="brand-badge">{{ item.brand }}</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="brand-info">
                    <span class="brand-name">{{ item.brand }}</span>
                    <span class="category">{{ item.category }}</span>
                  </div>
                  <div class="price-info">
                    <span class="current-price">¥{{ item.currentPrice }}</span>
                    <span class="original-price">¥{{ item.originalPrice }}</span>
                  </div>
                  <div class="brand-benefits">
                    <span class="discount-tag">{{ item.discount }}折</span>
                    <span class="free-shipping">包邮</span>
                  </div>
                  <button class="brand-buy-btn" @click="buyBrandItem(item)">立即购买</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 会员专享 -->
          <div v-if="selectedCategory === 'vip-only'" class="activity-block">
            <div class="block-header">
              <h2>👑 会员专享</h2>
              <p>VIP会员独享优惠</p>
            </div>
            
            <div class="vip-grid">
              <div v-for="item in vipItems" :key="item.id" class="vip-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.title" />
                  <div class="vip-badge">VIP</div>
                </div>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <div class="vip-benefits">
                    <span class="vip-price">会员价：¥{{ item.vipPrice }}</span>
                    <span class="regular-price">原价：¥{{ item.regularPrice }}</span>
                  </div>
                  <div class="vip-required">
                    需要VIP等级：{{ item.vipLevel }}
                  </div>
                  <button class="vip-buy-btn" @click="buyVipItem(item)">会员购买</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import SiteFooter from './SiteFooter.vue'
import userStore from '../stores/userStore'

const router = useRouter()

// 活动分类
const activityCategories = [
  { id: 'flash-sale', name: '限时秒杀' },
  { id: 'new-arrival', name: '新品首发' },
  { id: 'clearance', name: '清仓特卖' },
  { id: 'brand-sale', name: '品牌特卖' },
  { id: 'vip-only', name: '会员专享' }
]

const selectedCategory = ref('flash-sale')

// 倒计时
const countdown = ref({ hours: '00', minutes: '00', seconds: '00' })
let countdownTimer: number | null = null

// 限时秒杀商品
const flashSaleItems = ref([
  {
    id: '1',
    title: 'Apple iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    currentPrice: 7999,
    originalPrice: 9999,
    discount: 8,
    soldCount: 156,
    totalStock: 200,
    soldPercentage: 78
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 降噪耳机',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    currentPrice: 1999,
    originalPrice: 2999,
    discount: 6.7,
    soldCount: 89,
    totalStock: 150,
    soldPercentage: 59
  },
  {
    id: '3',
    title: 'Nike Air Jordan 1 Retro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    currentPrice: 899,
    originalPrice: 1299,
    discount: 6.9,
    soldCount: 234,
    totalStock: 300,
    soldPercentage: 78
  },
  {
    id: '4',
    title: 'Dyson V15 Detect 吸尘器',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    currentPrice: 3999,
    originalPrice: 5999,
    discount: 6.7,
    soldCount: 67,
    totalStock: 100,
    soldPercentage: 67
  },
  {
    id: '5',
    title: 'MacBook Pro M3 Max',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    currentPrice: 19999,
    originalPrice: 24999,
    discount: 8,
    soldCount: 45,
    totalStock: 80,
    soldPercentage: 56
  },
  {
    id: '6',
    title: '华为 Mate 60 Pro+',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    currentPrice: 6999,
    originalPrice: 8999,
    discount: 7.8,
    soldCount: 178,
    totalStock: 250,
    soldPercentage: 71
  },
  {
    id: '7',
    title: 'DJI Mini 4 Pro 无人机',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop',
    currentPrice: 3999,
    originalPrice: 4999,
    discount: 8,
    soldCount: 123,
    totalStock: 180,
    soldPercentage: 68
  },
  {
    id: '8',
    title: 'Rolex Submariner 绿水鬼',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    currentPrice: 89999,
    originalPrice: 99999,
    discount: 9,
    soldCount: 12,
    totalStock: 20,
    soldPercentage: 60
  }
])

// 新品首发
const newArrivalItems = ref([
  {
    id: '1',
    title: '华为 Mate 60 Pro+',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    description: '全新麒麟芯片，卫星通讯，超长续航',
    price: 8999
  },
  {
    id: '2',
    title: 'MacBook Pro M3 Max',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    description: 'M3 Max芯片，专业级性能，创意工作首选',
    price: 24999
  },
  {
    id: '3',
    title: 'DJI Mini 4 Pro 无人机',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop',
    description: '4K视频，智能避障，超长续航',
    price: 4999
  }
])

// 清仓特卖
const clearanceItems = ref([
  {
    id: '1',
    title: '小米12S Ultra',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    currentPrice: 3999,
    originalPrice: 5999,
    remainingStock: 15
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    currentPrice: 2999,
    originalPrice: 4999,
    remainingStock: 8
  },
  {
    id: '3',
    title: 'OnePlus 11',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    currentPrice: 2499,
    originalPrice: 3999,
    remainingStock: 23
  }
])

// 品牌特卖
const brandSaleItems = ref([
  {
    id: '1',
    title: 'Nike Air Force 1 经典款',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Nike',
    category: '运动鞋',
    currentPrice: 599,
    originalPrice: 899,
    discount: 6.7
  },
  {
    id: '2',
    title: 'Adidas Ultraboost 22',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Adidas',
    category: '跑鞋',
    currentPrice: 799,
    originalPrice: 1299,
    discount: 6.1
  },
  {
    id: '3',
    title: 'Uniqlo 基础款T恤',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    brand: 'Uniqlo',
    category: '服装',
    currentPrice: 39,
    originalPrice: 79,
    discount: 4.9
  },
  {
    id: '4',
    title: 'Zara 连衣裙',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    brand: 'Zara',
    category: '女装',
    currentPrice: 199,
    originalPrice: 399,
    discount: 5.0
  }
])

// 会员专享
const vipItems = ref([
  {
    id: '1',
    title: 'Rolex Submariner 绿水鬼',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
    vipPrice: 89999,
    regularPrice: 99999,
    vipLevel: '钻石会员'
  },
  {
    id: '2',
    title: 'Hermès Birkin 30',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    vipPrice: 199999,
    regularPrice: 299999,
    vipLevel: '黑金会员'
  }
])

// 选择活动分类
function selectCategory(categoryId: string) {
  selectedCategory.value = categoryId
}

// 购买商品
function buyNow(item: any) {
  if (!userStore.checkLoginStatus()) {
    router.push('/login')
    return
  }
  // 这里可以跳转到商品详情页或购物车
  alert(`正在购买：${item.title}`)
}

// 预览商品
function previewItem(item: any) {
  alert(`预览商品：${item.title}`)
}

// 购买品牌商品
function buyBrandItem(item: any) {
  if (!userStore.checkLoginStatus()) {
    router.push('/login')
    return
  }
  alert(`购买品牌商品：${item.title}`)
}

// 购买VIP商品
function buyVipItem(item: any) {
  if (!userStore.checkLoginStatus()) {
    router.push('/login')
    return
  }
  // 检查VIP等级
  alert(`购买VIP商品：${item.title}`)
}

// 更新倒计时
function updateCountdown() {
  const now = new Date().getTime()
  const endTime = new Date().setHours(23, 59, 59, 999) // 今天结束
  const timeLeft = endTime - now

  if (timeLeft > 0) {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

    countdown.value = {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    }
  }
}

// 组件挂载时启动倒计时
onMounted(() => {
  updateCountdown()
  countdownTimer = window.setInterval(updateCountdown, 1000)
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
.activities-page {
  min-height: 100vh;
  background: #f8fafc;
}

.activities-content {
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 页面标题 */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 16px;
}

.page-header p {
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
}

/* 活动分类导航 */
.activity-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 60px;
  z-index: 100;
}

.nav-tabs {
  display: flex;
  gap: 0;
  overflow-x: auto;
}

.nav-tab {
  padding: 20px 32px;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-tab:hover {
  color: #3b82f6;
}

.nav-tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

/* 活动内容 */
.activities-section {
  padding: 40px 0;
}

.activity-block {
  margin-bottom: 60px;
}

.block-header {
  text-align: center;
  margin-bottom: 40px;
}

.block-header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 16px;
}

.block-header p {
  font-size: 18px;
  color: #6b7280;
  margin: 0;
}

/* 倒计时 */
.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.time-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-unit {
  background: #ef4444;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 800;
  font-size: 18px;
  min-width: 40px;
  text-align: center;
}

.time-separator {
  font-size: 24px;
  font-weight: 800;
  color: #ef4444;
}

/* 限时秒杀网格 */
.flash-sale-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.flash-sale-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.flash-sale-item:hover {
  transform: translateY(-4px);
}

.item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
}

.item-info {
  padding: 20px;
}

.item-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px;
  line-height: 1.4;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.current-price {
  font-size: 24px;
  font-weight: 800;
  color: #ef4444;
}

.original-price {
  font-size: 16px;
  color: #9ca3af;
  text-decoration: line-through;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transition: width 0.3s ease;
}

.stock-info {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

.buy-now-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buy-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

/* 新品首发网格 */
.new-arrival-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.new-arrival-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.new-arrival-item:hover {
  transform: translateY(-4px);
}

.new-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
}

.item-desc {
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
}

.early-bird {
  background: #fbbf24;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.preview-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

/* 清仓特卖网格 */
.clearance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.clearance-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.clearance-item:hover {
  transform: translateY(-4px);
}

.clearance-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #f59e0b;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
}

.stock-warning {
  background: #fef3c7;
  color: #92400e;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

/* 品牌特卖网格 */
.brand-sale-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.brand-sale-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.brand-sale-item:hover {
  transform: translateY(-4px);
}

.brand-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
}

.brand-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.brand-name {
  background: #dbeafe;
  color: #1e40af;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.category {
  background: #f3e8ff;
  color: #7c3aed;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.brand-benefits {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.discount-tag {
  background: #fef3c7;
  color: #92400e;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
}

.free-shipping {
  background: #dcfce7;
  color: #166534;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.brand-buy-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.brand-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

/* 会员专享网格 */
.vip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.vip-item {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.vip-item:hover {
  transform: translateY(-4px);
}

.vip-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
}

.vip-benefits {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.vip-price {
  font-size: 20px;
  font-weight: 800;
  color: #f59e0b;
}

.regular-price {
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
}

.vip-required {
  background: #fef3c7;
  color: #92400e;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
}

.vip-buy-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vip-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(251, 191, 36, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 36px;
  }
  
  .nav-tabs {
    justify-content: flex-start;
  }
  
  .nav-tab {
    padding: 16px 24px;
    font-size: 14px;
  }
  
  .flash-sale-grid,
  .new-arrival-grid,
  .clearance-grid,
  .brand-sale-grid,
  .vip-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
