<template>
  <div class="home-page">
    <NavBar />
    <main class="home-content">
      <!-- 顶部搜索横幅 -->
      <section class="hero">
        <div class="hero-inner">
          <h1>乐居商城</h1>
          <p>严选好物 · 特惠不停 · 次日达</p>
          <div class="search-bar">
            <input
              v-model="keyword"
              type="text"
              placeholder="搜索商品、品牌或类目 回车/点击搜索"
              @keyup.enter="doSearch"
            />
            <button @click="doSearch">搜索</button>
          </div>
          <div class="quick-cats">
            <button
              v-for="c in hotCategories"
              :key="c"
              class="chip"
              @click="selectCategory(c)"
            >{{ c }}</button>
          </div>
        </div>
        <div class="hero-banner" aria-hidden="true"></div>
      </section>

      <!-- 促销条 -->
      <section class="promo-strip">
        <div class="promo-item">全场满199包邮</div>
        <div class="promo-item">新人立减¥20</div>
        <div class="promo-item">7天无理由退换</div>
        <div class="promo-item">次日达（覆盖核心城市）</div>
      </section>

      <!-- 主目录区：分类 + 商品区 -->
      <section class="catalog">
        <aside class="category-nav">
          <h3>全部分类</h3>
          <ul>
            <li
              :class="{ active: !selectedCategory }"
              @click="selectCategory(null)"
            >全部</li>
            <li
              v-for="cat in categories"
              :key="cat"
              :class="{ active: selectedCategory === cat }"
              @click="selectCategory(cat)"
            >{{ cat }}</li>
          </ul>
        </aside>

        <div class="product-area">
          <div class="toolbar">
            <div class="breadcrumbs">
              分类：<strong>{{ selectedCategory || '全部' }}</strong>
              <span v-if="keyword">｜关键词：<strong>{{ keyword }}</strong></span>
            </div>
            <div class="sort">
              <label for="sortBy">排序：</label>
              <select id="sortBy" v-model="sortBy">
                <option value="popular">人气优先</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
                <option value="new">上新优先</option>
              </select>
            </div>
          </div>

          <div class="product-grid">
            <article v-for="p in pagedProducts" :key="p.id" class="product-card">
              <div class="thumb" @click="goDetail(p.id)" style="cursor:pointer">
                <img :src="p.image" :alt="p.title" loading="lazy" @error="onImgError($event, p)" />
                <span v-if="p.originalPrice && p.originalPrice > p.price" class="tag tag-sale">SALE</span>
              </div>
              <h4 class="title" :title="p.title" @click="goDetail(p.id)" style="cursor:pointer">{{ p.title }}</h4>
              <div class="meta">
                <div class="price">
                  <span class="current">¥{{ p.price.toFixed(2) }}</span>
                  <span v-if="p.originalPrice" class="orig">¥{{ p.originalPrice.toFixed(2) }}</span>
                </div>
                <div class="rating" :title="`评分 ${p.rating.toFixed(1)}`">⭐ {{ p.rating.toFixed(1) }}</div>
              </div>
              <button class="add-btn" @click="addToCart(p)">加入购物车</button>
            </article>
          </div>

          <!-- 分页器（内置） -->
          <div class="pager" v-if="totalPages > 1">
            <span class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</span>
            <div class="pager-actions">
              <button :disabled="currentPage===1" @click="currentPage--">上一页</button>
              <button :disabled="currentPage===totalPages" @click="currentPage++">下一页</button>
            </div>
          </div>
        </div>

      </section>

      <!-- 页脚 -->
      <SiteFooter />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import SiteFooter from './SiteFooter.vue'
import catalog, { type Product } from '../stores/catalogStore'

// 示例分类与热词
const categories = [
  '数码家电', '家居生活', '美妆个护', '运动户外', '食品饮料', '服饰鞋包', '母婴玩具', '宠物用品'
]
const hotCategories = ['爆款', '新品', '清仓', '199包邮']

// 示例商品采用 catalogStore 的类型与数据
const router = useRouter()

// 使用 catalogStore 的数据（避免与详情数据不一致）
const products = catalog.products


const keyword = ref('')
const selectedCategory = ref<string | null>(null)
const sortBy = ref<'popular' | 'price-asc' | 'price-desc' | 'new'>('popular')

const filteredProducts = computed(() => {
  let list = products.value.filter(p => {
    const matchCat = selectedCategory.value ? p.category === selectedCategory.value : true
    const matchKw = keyword.value ? (p.title.includes(keyword.value)) : true
    return matchCat && matchKw
  })

  switch (sortBy.value) {
    case 'price-asc':
      list = list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list = list.sort((a, b) => b.price - a.price)
      break
    case 'new':
      list = list.sort((a, b) => b.createdAt - a.createdAt)
      break
    default:
      list = list.sort((a, b) => b.rating - a.rating)
  }
  return list
})

// 分页
const pageSize = 9
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / pageSize)))
const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})
watch([keyword, selectedCategory, sortBy], () => { currentPage.value = 1 })

function selectCategory(cat: string | null) {
  selectedCategory.value = cat
}
function doSearch() {
  // 这里可发起请求；当前使用前端筛选
}
import cartStore from '../stores/cartStore'
function addToCart(p: Product) {
  cartStore.addItem({ id: p.id, title: p.title, price: p.price, image: p.image }, 1)
}
function onImgError(e: Event, p: Product) {
  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${encodeURIComponent(p.id)}/600/400`
}
function goDetail(id: string){
  router.push(`/product/${id}`)
}
</script>

<style scoped>
.home-page { min-height: 100vh; width: 100vw; background: #f8fafc; overflow-x: hidden; }
.home-content { margin-top: 60px; min-height: calc(100vh - 60px); }

/* 顶部横幅 */
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  padding: 36px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.hero-banner {
  border-radius: 16px;
  min-height: 220px;
  background: url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop') center/cover no-repeat;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);
}
.hero-inner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12);
}
.hero-inner h1 { margin: 0 0 6px; font-size: 28px; font-weight: 800; }
.hero-inner p { margin: 0 0 16px; opacity: .95; }
.search-bar { display: flex; gap: 10px; }
.search-bar input {
  flex: 1; height: 44px; border-radius: 10px; border: none; outline: none; padding: 0 14px; font-size: 14px;
}
.search-bar button {
  height: 44px; padding: 0 18px; border-radius: 10px; border: none; background: #00e0ff; color: #002b5b; font-weight: 800; cursor: pointer;
}
.quick-cats { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 8px 12px; border-radius: 999px; border: none; background: rgba(255,255,255,.2); color: #fff; cursor: pointer; }
.chip:hover { background: rgba(255,255,255,.3); }

/* 促销条 */
.promo-strip { max-width: 1200px; margin: 12px auto 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 0 20px; }
.promo-item { background: #fff; border-radius: 10px; padding: 12px 14px; text-align: center; color: #111827; box-shadow: 0 4px 14px rgba(0,0,0,.06); font-weight: 600; }

/* 目录 */
.catalog { max-width: 1200px; margin: 18px auto 40px; padding: 0 20px; display: grid; grid-template-columns: 260px 1fr; gap: 20px; }
.category-nav { background: #fff; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,.08); padding: 16px; height: fit-content; position: sticky; top: 84px; }
.category-nav h3 { margin: 0 0 10px; font-size: 16px; color: #111827; }
.category-nav ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.category-nav li { padding: 10px 12px; border-radius: 8px; cursor: pointer; color: #374151; }
.category-nav li:hover { background: #f3f4f6; }
.category-nav li.active { background: #111827; color: #fff; }

.product-area { min-width: 0; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.breadcrumbs { color: #6b7280; }
.sort select { height: 36px; border-radius: 8px; border: 1px solid #e5e7eb; padding: 0 10px; }

.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.product-card { background: #fff; border-radius: 12px; box-shadow: 0 8px 22px rgba(0,0,0,.08); overflow: hidden; display: flex; flex-direction: column; }
.thumb { position: relative; aspect-ratio: 4 / 3; background: #f3f4f6; }
.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tag { position: absolute; top: 10px; left: 10px; padding: 4px 8px; border-radius: 999px; font-size: 12px; font-weight: 800; }
.tag-sale { background: #fee2e2; color: #b91c1c; }
.title { margin: 10px 12px 0; font-size: 14px; color: #111827; line-height: 1.5; height: 42px; overflow: hidden; }
.meta { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; }
.price .current { color: #111827; font-weight: 800; }
.price .orig { color: #9ca3af; text-decoration: line-through; margin-left: 8px; font-size: 12px; }
.rating { color: #f59e0b; font-weight: 700; }
.add-btn { margin: 8px 12px 12px; height: 38px; border: none; border-radius: 10px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; font-weight: 700; cursor: pointer; }
.add-btn:hover { filter: brightness(1.05); }

.pager{display:flex;gap:12px;align-items:center;justify-content:flex-end;margin:18px 0}
.page-info{color:#6b7280;margin-right:8px}
.pager-actions{display:flex;gap:8px}
.pager-actions button{height:32px;padding:0 12px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#111827;cursor:pointer}
.pager-actions button:disabled{opacity:.6;cursor:not-allowed}

@media (max-width: 1024px) {
  .hero { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .promo-strip { grid-template-columns: repeat(2, 1fr); }
  .catalog { grid-template-columns: 1fr; }
  .category-nav { position: static; }
}
</style> 