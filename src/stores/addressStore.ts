import { ref, computed } from 'vue'

export interface AddressItem {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  addressDetail: string
  isDefault?: boolean
}

class AddressStore {
  private storageKey = 'addressBook'
  items = ref<AddressItem[]>([])

  constructor() {
    this.load()
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items.value))
  }
  private load() {
    const raw = localStorage.getItem(this.storageKey)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AddressItem[]
        if (Array.isArray(parsed)) this.items.value = parsed
      } catch {}
    }
  }

  add(address: Omit<AddressItem, 'id' | 'isDefault'>, setDefault = false) {
    const id = this.genId()
    const item: AddressItem = { id, ...address, isDefault: false }
    this.items.value.unshift(item)
    if (setDefault || this.items.value.length === 1) this.setDefault(id)
    this.save()
  }

  update(id: string, patch: Partial<AddressItem>) {
    const i = this.items.value.findIndex(a => a.id === id)
    if (i >= 0) {
      this.items.value[i] = { ...this.items.value[i], ...patch, id }
      this.save()
    }
  }

  remove(id: string) {
    this.items.value = this.items.value.filter(a => a.id !== id)
    this.save()
  }

  setDefault(id: string) {
    this.items.value = this.items.value.map(a => ({ ...a, isDefault: a.id === id }))
    this.save()
  }

  get defaultAddress() {
    return computed(() => this.items.value.find(a => a.isDefault) || null)
  }

  private genId() {
    return `addr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  }
}

const addressStore = new AddressStore()
export default addressStore 