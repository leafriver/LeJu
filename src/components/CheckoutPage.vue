<template>
  <div class="checkout-page">
    <NavBar />
    <main class="container">
      <header class="hero">
        <h1>确认订单</h1>
        <router-link to="/cart" class="back-cart">返回购物车</router-link>
      </header>

      <div v-if="items.length" class="grid">
        <!-- 收货信息 -->
        <section class="panel">
          <h2>收货信息</h2>
          <form class="form" @submit.prevent="submitOrder">
            <div class="row">
              <label>收货人</label>
              <input v-model.trim="form.name" type="text" placeholder="请输入收货人姓名" required />
            </div>
            <div class="row">
              <label>手机号码</label>
              <input v-model.trim="form.phone" type="tel" placeholder="请输入手机号" required />
            </div>
            <div class="inline">
              <div class="row">
                <label>省/直辖市</label>
                <select v-model="form.province">
                  <option value="" disabled>请选择</option>
                  <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                </select>
              </div>
              <div class="row">
                <label>城市</label>
                <select v-model="form.city" :disabled="!cities.length">
                  <option value="" disabled>请选择</option>
                  <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div class="row">
                <label>区/县</label>
                <select v-model="form.district" :disabled="!districts.length">
                  <option value="" disabled>请选择</option>
                  <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <label>详细地址</label>
              <input v-model.trim="form.addressDetail" type="text" placeholder="街道/门牌号等" required />
            </div>

            <div class="inline">
              <div class="row">
                <label>配送方式</label>
                <select v-model="form.shipping">
                  <option value="express">快递配送（¥{{ shippingFee.toFixed(2) }}）</option>
                  <option value="pickup">门店自提（¥0.00）</option>
                </select>
              </div>
              <div class="row">
                <label>支付方式</label>
                <select v-model="form.payment">
                  <option value="alipay">支付宝</option>
                  <option value="wechat">微信支付</option>
                  <option value="card">银行卡</option>
                </select>
              </div>
            </div>

            <div class="row checkbox">
              <label>
                <input type="checkbox" v-model="form.needInvoice" /> 需要发票
              </label>
            </div>

            <!-- 保存到地址簿 -->
            <div class="save-addr-bar">
              <label class="inline-check">
                <input type="checkbox" v-model="saveAsDefault" /> 设为默认地址
              </label>
              <button type="button" class="save-addr-btn" @click="saveToAddressBook" :disabled="!isFormValid">保存到地址簿</button>
            </div>
          </form>
        </section>

        <!-- 订单摘要 -->
        <aside class="summary">
          <h2>订单摘要</h2>

          <!-- 地址簿快捷选择 -->
          <div class="addrbook" v-if="addressBook.length">
            <div class="addr-head">
              <span>地址簿</span>
              <span class="hint">点击使用其中一个地址</span>
            </div>
            <ul class="addr-list">
              <li v-for="addr in addressBook" :key="addr.id" class="addr-item" :class="{ def: addr.isDefault }" @click="useAddress(addr)">
                <div class="line1">
                  <b>{{ addr.name }}</b>
                  <span>{{ addr.phone }}</span>
                  <span v-if="addr.isDefault" class="tag">默认</span>
                </div>
                <div class="line2">{{ addr.province }} {{ addr.city }} {{ addr.district }} {{ addr.addressDetail }}</div>
                <div class="ops">
                  <button class="mini" @click.stop="setDefault(addr.id)">设为默认</button>
                  <button class="mini" @click.stop="startEdit(addr)">编辑</button>
                  <button class="mini danger" @click.stop="removeAddress(addr.id)">删除</button>
                </div>
                <div v-if="editingId === addr.id" class="addr-edit" @click.stop>
                  <div class="edit-grid">
                    <div class="edit-row">
                      <label>收货人</label>
                      <input v-model.trim="editForm.name" type="text" />
                    </div>
                    <div class="edit-row">
                      <label>手机</label>
                      <input v-model.trim="editForm.phone" type="tel" />
                    </div>
                    <div class="edit-row span-3">
                      <div class="inline">
                        <div class="row">
                          <label>省/直辖市</label>
                          <select v-model="editForm.province">
                            <option value="" disabled>请选择</option>
                            <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                          </select>
                        </div>
                        <div class="row">
                          <label>城市</label>
                          <select v-model="editForm.city" :disabled="!editCities.length">
                            <option value="" disabled>请选择</option>
                            <option v-for="c in editCities" :key="c" :value="c">{{ c }}</option>
                          </select>
                        </div>
                        <div class="row">
                          <label>区/县</label>
                          <select v-model="editForm.district" :disabled="!editDistricts.length">
                            <option value="" disabled>请选择</option>
                            <option v-for="d in editDistricts" :key="d" :value="d">{{ d }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="edit-row span-3">
                      <label>详细地址</label>
                      <input v-model.trim="editForm.addressDetail" type="text" />
                    </div>
                    <div class="edit-actions span-3">
                      <label class="inline-check"><input type="checkbox" v-model="editSetDefault" /> 设为默认</label>
                      <div class="gap"></div>
                      <button class="mini" @click="saveEdit">保存</button>
                      <button class="mini" @click="cancelEdit">取消</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <ul class="mini-list">
            <li v-for="it in items" :key="it.id" class="mini-item">
              <img :src="it.image" :alt="it.title" />
              <div class="meta">
                <p class="title" :title="it.title">{{ it.title }}</p>
                <p class="small">× {{ it.quantity }}</p>
              </div>
              <b>¥{{ (it.price * it.quantity).toFixed(2) }}</b>
            </li>
          </ul>

          <div class="rows">
            <div class="row2"><span>商品金额</span><b>¥{{ totalPrice.toFixed(2) }}</b></div>
            <div class="row2"><span>运费</span><b>¥{{ shippingFeeDisplay }}</b></div>
            <div class="row2 total"><span>应付金额</span><b>¥{{ payable.toFixed(2) }}</b></div>
          </div>

          <button class="place-order" :disabled="submitting" @click="submitOrder">{{ submitting ? '提交中...' : '提交订单' }}</button>

          <div class="pay-entry">
            <p>或选择支付方式：</p>
            <div class="pay-buttons">
              <button :disabled="!isFormValid" @click="goPay('alipay')">支付宝</button>
              <button :disabled="!isFormValid" @click="goPay('wechat')">微信</button>
              <button :disabled="!isFormValid" @click="goPay('card')">银行卡</button>
            </div>
          </div>
        </aside>
      </div>

      <section v-else class="empty">
        <p>购物车为空，<router-link to="/">去首页选购</router-link></p>
      </section>
    </main>

    <MessageModal
      :visible="successVisible"
      type="success"
      title="下单成功"
      :message="`订单号：${orderNo}`"
      @close="closeSuccess"
      @confirm="closeSuccess"
    />
  </div>

  <!-- 轻提示弹窗 -->
  <MessageModal
    :visible="toastVisible"
    type="success"
    :title="toastTitle"
    :message="toastText"
    @close="toastVisible=false"
    @confirm="toastVisible=false"
  />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'
import MessageModal from './MessageModal.vue'
import cartStore from '../stores/cartStore'
import addressStore from '../stores/addressStore'

// 轻提示
const toastVisible = ref(false)
const toastTitle = '提示'
const toastText = ref('')
function showToast(msg: string){ toastText.value = msg; toastVisible.value = true }

const router = useRouter()
const items = computed(() => cartStore.items.value)
const totalPrice = computed(() => cartStore.totalPrice.value)

// 地址簿
const addressBook = computed(() => addressStore.items.value)
function useAddress(a: any){
  form.name = a.name
  form.phone = a.phone
  form.province = a.province
  form.city = a.city
  form.district = a.district
  form.addressDetail = a.addressDetail
}
function setDefault(id: string){ addressStore.setDefault(id) }
function removeAddress(id: string){ addressStore.remove(id); showToast('已删除') }

// 编辑地址
const editingId = ref<string>('')
const editForm = reactive({ name: '', phone: '', province: '', city: '', district: '', addressDetail: '' })
const editCities = computed(() => mapCities[editForm.province] || [])
const editDistricts = computed(() => mapDistricts[editForm.city] || [])
function startEdit(a: any){
  editingId.value = a.id
  Object.assign(editForm, { name: a.name, phone: a.phone, province: a.province, city: a.city, district: a.district, addressDetail: a.addressDetail })
}
function cancelEdit(){ editingId.value = '' }
function saveEdit(){
  if(!/^\d{11}$/.test(editForm.phone) || !editForm.name || !editForm.province || !editForm.city || !editForm.district || !editForm.addressDetail){
    return showToast('请完善编辑信息（手机号需11位）')
  }
  addressStore.update(editingId.value, { ...editForm })
  if (editSetDefault.value) addressStore.setDefault(editingId.value)
  editingId.value = ''
  showToast('保存成功')
}
const editSetDefault = ref(false)

// 省市区（示例静态数据，可替换为接口联动）
const provinces = ['上海市','北京市','广东省']
const mapCities: Record<string,string[]> = {
  '上海市': ['上海市'],
  '北京市': ['北京市'],
  '广东省': ['广州市','深圳市','珠海市']
}
const mapDistricts: Record<string,string[]> = {
  '上海市': ['浦东新区','黄浦区','徐汇区'],
  '北京市': ['朝阳区','海淀区','东城区'],
  '广州市': ['天河区','越秀区','白云区'],
  '深圳市': ['南山区','福田区','罗湖区'],
  '珠海市': ['香洲区','斗门区']
}
const cities = computed(() => mapCities[form.province] || [])
const districts = computed(() => mapDistricts[form.city] || [])

const form = reactive({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  addressDetail: '',
  shipping: 'express',
  payment: 'alipay',
  needInvoice: false,
})

const shippingFee = computed(() => {
  if (form.shipping === 'pickup') return 0
  // 满199包邮
  return totalPrice.value >= 199 ? 0 : 12
})
const shippingFeeDisplay = computed(() => `¥${shippingFee.value.toFixed(2)}`)
const payable = computed(() => totalPrice.value + shippingFee.value)

const submitting = ref(false)
const successVisible = ref(false)
const orderNo = ref('')

const saveAsDefault = ref(true)
function saveToAddressBook(){
  if(!validate()) return showToast('请先填写完整且有效的收货信息')
  addressStore.add({
    name: form.name,
    phone: form.phone,
    province: form.province,
    city: form.city,
    district: form.district,
    addressDetail: form.addressDetail
  }, saveAsDefault.value)
  showToast('保存成功')
}

const isFormValid = computed(() => validate())
function goPay(channel: 'alipay'|'wechat'|'card') {
  if (!validate()) return alert('请先填写完整且有效的收货信息')
  const params = new URLSearchParams({ order: orderNo.value || genOrderNo(), amount: payable.value.toFixed(2) })
  if (channel === 'alipay') return router.push(`/pay/alipay?${params.toString()}`)
  if (channel === 'wechat') return router.push(`/pay/wechat?${params.toString()}`)
  return router.push(`/pay/card?${params.toString()}`)
}

function validate() {
  if (!form.name) return false
  // 手机号必须11位数字
  if (!/^\d{11}$/.test(form.phone)) return false
  // 省市区与详细地址必填
  if (!form.province || !form.city || !form.district || !form.addressDetail) return false
  return true
}

function genOrderNo() {
  const t = Date.now().toString()
  return `LJ${t.slice(-8)}${Math.floor(Math.random()*90+10)}`
}

function closeSuccess() {
  successVisible.value = false
  router.push('/')
}

async function submitOrder() {
  if (!validate()) return alert('请填写完整且有效的收货信息')
  submitting.value = true
  orderNo.value = genOrderNo()
  setTimeout(() => {
    submitting.value = false
    successVisible.value = true
    cartStore.clear()
  }, 1200)
}

// 若购物车为空，直接引导
if (!items.value.length) {
  // 可选择重定向 router.push('/')
}
</script>

<style scoped>
.checkout-page{background:#f8fafc;min-height:100vh}
.container{margin-top:60px;max-width:1200px;margin-inline:auto;padding:24px 20px 40px}
.hero{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:16px;padding:18px 24px;display:flex;justify-content:space-between;align-items:center}
.back-cart{height:36px;display:inline-flex;align-items:center;padding:0 14px;border-radius:10px;background:#fff;color:#1d4ed8;font-weight:800;text-decoration:none}
.grid{display:grid;grid-template-columns:1fr 360px;gap:16px;margin-top:16px}
.panel{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:16px}
.panel h2{margin:0 0 12px}
.form .row{display:grid;gap:6px;margin-bottom:12px}
.form label{color:#374151;font-size:14px}
.form input,.form select{height:38px;border:1px solid #e5e7eb;border-radius:8px;padding:0 10px}
.inline{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.checkbox input{margin-right:8px}
.save-addr-bar{display:flex;justify-content:space-between;align-items:center;margin-top:6px;gap:10px}
.inline-check{display:flex;align-items:center;gap:6px;color:#374151}
.save-addr-btn{height:36px;padding:0 12px;border-radius:10px;border:1px solid #e5e7eb;background:#fff;color:#111827;font-weight:700;cursor:pointer}
.save-addr-btn:disabled{opacity:.6;cursor:not-allowed}

.summary{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:16px;height:fit-content;position:sticky;top:84px}
.summary h2{margin:0 0 12px}
.addrbook{border:1px solid #e5e7eb;border-radius:10px;padding:10px;margin-bottom:10px}
.addr-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;color:#6b7280}
.addr-list{list-style:none;margin:0;padding:0;display:grid;gap:8px;max-height:180px;overflow:auto}
.addr-item{border:1px solid #e5e7eb;border-radius:8px;padding:8px;cursor:pointer}
.addr-item.def{border-color:#2563eb}
.addr-item .line1{display:flex;gap:10px;align-items:center}
.addr-item .tag{background:#dbeafe;color:#2563eb;border-radius:999px;padding:2px 6px;font-size:12px}
.addr-item .line2{color:#6b7280;font-size:12px;margin-top:4px}
.addr-item .ops{display:flex;gap:8px;margin-top:6px}
.addr-item .mini{height:26px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;color:#111827;padding:0 8px;cursor:pointer}
.addr-item .mini.danger{background:#fee2e2;border-color:#fecaca;color:#b91c1c}
.mini-list{list-style:none;margin:0;padding:0;display:grid;gap:10px;max-height:260px;overflow:auto}
.mini-item{display:grid;grid-template-columns:64px 1fr auto;gap:10px;align-items:center}
.mini-item img{width:64px;height:48px;object-fit:cover;border-radius:6px;background:#f3f4f6}
.mini-item .title{margin:0;color:#111827;font-size:14px}
.mini-item .small{margin:2px 0 0;color:#6b7280;font-size:12px}
.rows{margin-top:12px}
.row2{display:flex;justify-content:space-between;margin-bottom:8px}
.total{font-weight:800}
.place-order{width:100%;height:40px;border:none;border-radius:10px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-weight:800;cursor:pointer;margin-top:10px}
.pay-entry{margin-top:10px}
.pay-buttons{display:flex;gap:8px}
.pay-buttons button{height:36px;padding:0 12px;border-radius:10px;border:1px solid #e5e7eb;background:#fff;color:#111827;font-weight:700;cursor:pointer}
.pay-buttons button:disabled{opacity:.6;cursor:not-allowed}
.empty{background:#fff;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.06);padding:24px;margin-top:16px;text-align:center}
@media (max-width: 960px){.grid{grid-template-columns:1fr}}
</style> 