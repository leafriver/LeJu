import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

class CartStore {
  private storageKey = 'cartItems'
  items = ref<CartItem[]>([])

  constructor() {
    this.loadFromStorage()
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items.value))
  }

  private loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[]
        if (Array.isArray(parsed)) this.items.value = parsed
      } catch {}
    }
  }

  addItem(newItem: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const idx = this.items.value.findIndex(i => i.id === newItem.id)
    if (idx >= 0) {
      this.items.value[idx].quantity += quantity
    } else {
      this.items.value.push({ ...newItem, quantity })
    }
    this.saveToStorage()
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.items.value.find(i => i.id === id)
    if (!item) return
    item.quantity = Math.max(1, quantity)
    this.saveToStorage()
  }

  removeItem(id: string) {
    this.items.value = this.items.value.filter(i => i.id !== id)
    this.saveToStorage()
  }

  clear() {
    this.items.value = []
    this.saveToStorage()
  }

  totalQuantity = computed(() => this.items.value.reduce((sum, i) => sum + i.quantity, 0))
  totalPrice = computed(() => this.items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))
}

const cartStore = new CartStore()
export default cartStore 