import { ref } from 'vue'

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

const products = ref<Product[]>([
  { id: '1', title: '无线蓝牙耳机 降噪运动款', category: '数码家电', price: 199, originalPrice: 299, image: 'https://picsum.photos/seed/earbuds/600/400', rating: 4.6, createdAt: Date.now() - 86400 * 1000 * 2, description: '蓝牙5.3，主动降噪，运动稳固佩戴。' },
  { id: '2', title: '多功能料理机 家用搅拌榨汁', category: '数码家电', price: 329, originalPrice: 429, image: 'https://picsum.photos/seed/blender/600/400', rating: 4.4, createdAt: Date.now() - 86400 * 1000 * 20, description: '破壁研磨，冷热双杯，营养不流失。' },
  { id: '3', title: '北欧简约落地灯 客厅卧室', category: '家居生活', price: 159, originalPrice: 199, image: 'https://picsum.photos/seed/lamp/600/400', rating: 4.2, createdAt: Date.now() - 86400 * 1000 * 6, description: '柔和光源，三档调光，点亮温馨空间。' },
  { id: '4', title: '保温杯 316不锈钢 时尚便携', category: '家居生活', price: 89, originalPrice: 129, image: 'https://picsum.photos/seed/bottle/600/400', rating: 4.8, createdAt: Date.now() - 86400 * 1000 * 1, description: '长效保温，防漏杯盖，通勤必备。' },
  { id: '5', title: '运动跑鞋 轻量缓震 男女同款', category: '运动户外', price: 239, originalPrice: 399, image: 'https://picsum.photos/seed/running/600/400', rating: 4.5, createdAt: Date.now() - 86400 * 1000 * 12, description: '轻盈透气，中底缓震，畅快奔跑。' },
  { id: '6', title: '天然矿泉水 整箱装 500ml*24', category: '食品饮料', price: 49.9, originalPrice: 69.9, image: 'https://picsum.photos/seed/water/600/400', rating: 4.1, createdAt: Date.now() - 86400 * 1000 * 40, description: '水源纯净，口感清冽，家庭常备。' },
  { id: '7', title: '护肤精华 玻尿酸补水保湿', category: '美妆个护', price: 129, originalPrice: 169, image: 'https://picsum.photos/seed/serum/600/400', rating: 4.3, createdAt: Date.now() - 86400 * 1000 * 4, description: '高浓补水，强韧肌底，焕活光泽。' },
  { id: '8', title: '婴儿纸尿裤 L码 64片', category: '母婴玩具', price: 99, originalPrice: 129, image: 'https://picsum.photos/seed/diaper/600/400', rating: 4.7, createdAt: Date.now() - 86400 * 1000 * 7, description: '柔软透气，强力锁水，亲肤不红屁屁。' },
  { id: '9', title: '宠物猫砂 低尘结团 10kg', category: '宠物用品', price: 69, originalPrice: 89, image: 'https://picsum.photos/seed/litter/600/400', rating: 4.0, createdAt: Date.now() - 86400 * 1000 * 14, description: '结团紧实，除味持久，低粉尘。' },
  { id: '10', title: '纯棉T恤 亲肤透气 多色可选', category: '服饰鞋包', price: 59, originalPrice: 99, image: 'https://picsum.photos/seed/tshirt/600/400', rating: 4.2, createdAt: Date.now() - 86400 * 1000 * 3, description: '100%棉，柔软亲肤，夏日首选。' },
])

function getById(id: string) {
  return products.value.find(p => p.id === id) || null
}

export default {
  products,
  getById,
} 