<template>
  <div class="cart-page">
    <NavBar />
    <main class="container">
      <header class="hero"><h1>我的购物车</h1><p>共 {{ totalQuantity }} 件商品</p><router-link to="/" class="back-home">返回首页</router-link></header>
      <section class="content" v-if="items.length">
        <div class="cart-grid">
          <div class="cart-list">
            <div v-for="item in items" :key="item.id" class="cart-item">
              <img :src="item.image" :alt="item.title" class="thumb" />
              <div class="info">
                <h3 class="title">{{ item.title }}</h3>
                <div class="price">¥{{ item.price.toFixed(2) }}</div>
              </div>
              <div class="qty">
                <button @click="dec(item)">-</button>
                <input type="number" :value="item.quantity" @input="onQtyInput($event, item)" />
                <button @click="inc(item)">+</button>
              </div>
              <div class="sum">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
              <button class="remove" @click="remove(item.id)">删除</button>
            </div>
          </div>
          <aside class="summary">
            <div class="row"><span>商品件数</span><b>{{ totalQuantity }}</b></div>
            <div class="row"><span>商品金额</span><b>¥{{ totalPrice.toFixed(2) }}</b></div>
            <button class="checkout" @click="goCheckout">去结算</button>
            <button class="clear" @click="clear">清空购物车</button>
          </aside>
        </div>
      </section>
      <section class="empty" v-else>
        <p>购物车空空如也，去逛逛吧～</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './NavBar.vue'
import cartStore from '../stores/cartStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = computed(() => cartStore.items.value)
const totalQuantity = computed(() => cartStore.totalQuantity.value)
const totalPrice = computed(() => cartStore.totalPrice.value)

function inc(item: any) { cartStore.updateQuantity(item.id, item.quantity + 1) }
function dec(item: any) { cartStore.updateQuantity(item.id, item.quantity - 1) }
function onQtyInput(e: Event, item: any) {
  const v = parseInt((e.target as HTMLInputElement).value || '1', 10)
  cartStore.updateQuantity(item.id, isNaN(v) ? 1 : v)
}
function remove(id: string) { cartStore.removeItem(id) }
function clear() { cartStore.clear() }
function goCheckout() {
  if (!items.value.length) return
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:24px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.back-home{height:36px;display:inline-flex;align-items:center;padding:0 14px;border-radius:10px;background:#fff;color:#1d4ed8;font-weight:800;text-decoration:none}
.back-home:hover{filter:brightness(0.95)}
.content{margin-top:16px}
.cart-grid{display:grid;grid-template-columns:1fr 320px;gap:16px}
.cart-list{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:10px}
.cart-item{display:grid;grid-template-columns:96px 1fr auto auto auto;gap:12px;align-items:center;padding:10px;border-bottom:1px solid #f1f5f9}
.cart-item:last-child{border-bottom:none}
.thumb{width:96px;height:72px;object-fit:cover;border-radius:8px;background:#f3f4f6}
.info .title{margin:0 0 6px;color:#111827;font-size:14px}
.info .price{color:#111827;font-weight:700}
.qty{display:flex;align-items:center;gap:6px}
.qty button{width:28px;height:28px;border-radius:6px;border:1px solid #e5e7eb;background:#fff;cursor:pointer}
.qty input{width:54px;height:28px;border:1px solid #e5e7eb;border-radius:6px;text-align:center}
.sum{font-weight:800;color:#111827}
.remove{border:none;background:#fee2e2;color:#b91c1c;border-radius:8px;height:32px;padding:0 12px;cursor:pointer}
.summary{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:16px;height:fit-content;position:sticky;top:84px}
.summary .row{display:flex;justify-content:space-between;margin-bottom:8px}
.checkout{width:100%;height:38px;border:none;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;font-weight:800;cursor:pointer;margin-top:8px}
.clear{width:100%;height:36px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;color:#111827;cursor:pointer;margin-top:8px}
.empty{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:24px;margin-top:16px;text-align:center;color:#64748b}
@media (max-width: 960px){.cart-grid{grid-template-columns:1fr}.cart-item{grid-template-columns:80px 1fr auto auto;}.sum{display:none}}
</style> 