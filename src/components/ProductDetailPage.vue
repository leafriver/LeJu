<template>
  <div class="product-detail">
    <NavBar />
    <main class="container" v-if="product">
      <div class="gallery">
        <img :src="product.image" :alt="product.title" />
      </div>
      <section class="info">
        <h1 class="title">{{ product.title }}</h1>
        <div class="price">
          <span class="current">¥{{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="orig">¥{{ product.originalPrice.toFixed(2) }}</span>
        </div>
        <p class="desc">{{ product.description }}</p>
        <div class="qty">
          <label>数量</label>
          <button @click="dec">-</button>
          <input :value="quantity" @input="onQty" />
          <button @click="inc">+</button>
        </div>
        <div class="actions">
          <button class="add" @click="add">加入购物车</button>
          <button class="buy" @click="buy">立即购买</button>
        </div>
      </section>
    </main>
    <section v-else class="empty">
      商品不存在或已下架。
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import cartStore from '../stores/cartStore'
import catalog from '../stores/catalogStore'

const route = useRoute()
const router = useRouter()
const pid = route.params.id as string
const product = computed(() => catalog.getById(pid))
const quantity = ref(1)

function inc(){ quantity.value++ }
function dec(){ quantity.value = Math.max(1, quantity.value - 1) }
function onQty(e: Event){
  const v = parseInt((e.target as HTMLInputElement).value || '1', 10)
  quantity.value = isNaN(v) ? 1 : Math.max(1, v)
}
function add(){
  if (!product.value) return
  cartStore.addItem({ id: product.value.id, title: product.value.title, price: product.value.price, image: product.value.image }, quantity.value)
}
function buy(){
  add()
  router.push('/checkout')
}
</script>

<style scoped>
.product-detail{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px;display:grid;grid-template-columns:520px 1fr;gap:24px}
.gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;background:#f3f4f6}
.info .title{margin:0 0 10px;color:#111827}
.price{display:flex;gap:10px;align-items:baseline;margin:8px 0}
.price .current{color:#111827;font-weight:800;font-size:24px}
.price .orig{color:#9ca3af;text-decoration:line-through}
.desc{color:#374151;margin:8px 0 14px}
.qty{display:flex;align-items:center;gap:8px}
.qty button{width:28px;height:28px;border:1px solid #e5e7eb;background:#fff;border-radius:6px;cursor:pointer}
.qty input{width:64px;height:28px;border:1px solid #e5e7eb;border-radius:6px;text-align:center}
.actions{display:flex;gap:12px;margin-top:14px}
.add{height:40px;padding:0 18px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;color:#111827;font-weight:800;cursor:pointer}
.buy{height:40px;padding:0 18px;border:none;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;font-weight:800;cursor:pointer}
.empty{padding:120px 20px;text-align:center;color:#64748b}
@media (max-width: 960px){.container{grid-template-columns:1fr}}
</style> 