// ═══════════════════════════════════════════════════════════
//  app.js — Punto de entrada principal de la aplicación
//  Crea la app Vue, registra componentes y monta en #app
// ═══════════════════════════════════════════════════════════

import { discountedPrice, formatPrice } from './utils.js'
import { categoriesData, productsData }  from './data.js'
import { EmptyState }  from './components/EmptyState.js'
import { ProductCard }  from './components/ProductCard.js'
import { CartDrawer }   from './components/CartDrawer.js'

const { createApp, ref, computed } = Vue

const app = createApp({
  setup() {
    // ─── DATA ───────────────────────────────────────────────
    const search = ref('')
    const selectedCategory = ref('all')
    const sortBy = ref('default')
    const cartOpen = ref(false)
    const cart = ref([])
    const justAdded = ref(null)
    const toastVisible = ref(false)
    const toastMsg = ref('')

    const categories = ref(categoriesData)
    const products = ref(productsData)

    // ─── COMPUTED ────────────────────────────────────────────
    const filteredProducts = computed(() => {
      let list = products.value

      if (selectedCategory.value !== 'all') {
        list = list.filter(p => p.category === selectedCategory.value)
      }

      if (search.value.trim()) {
        const q = search.value.toLowerCase()
        list = list.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      }

      const s = [...list]
      if (sortBy.value === 'price-asc')  s.sort((a,b) => discountedPrice(a) - discountedPrice(b))
      if (sortBy.value === 'price-desc') s.sort((a,b) => discountedPrice(b) - discountedPrice(a))
      if (sortBy.value === 'name')       s.sort((a,b) => a.name.localeCompare(b.name))
      if (sortBy.value === 'rating')     s.sort((a,b) => b.rating - a.rating)

      return s
    })

    const categoryLabel = computed(() => {
      const c = categories.value.find(c => c.value === selectedCategory.value)
      return c ? c.label : ''
    })

    const cartTotal = computed(() =>
      cart.value.reduce((sum, item) => sum + item.finalPrice, 0)
    )

    // ─── MÉTODOS ─────────────────────────────────────────────
    function setCategory(cat) {
      selectedCategory.value = cat
    }

    function selectColor(product, index) {
      product.selectedColor = index
    }

    function addToCart(product) {
      if (product.stock === 0) return
      cart.value.push({
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        finalPrice: discountedPrice(product),
      })
      justAdded.value = product.id
      showToast(`"${product.name}" añadido al carrito`)
      setTimeout(() => { justAdded.value = null }, 1800)
    }

    function removeFromCart(index) {
      const removed = cart.value.splice(index, 1)
      showToast(`"${removed[0].name}" eliminado`)
    }

    function checkout() {
      showToast('¡Pedido procesado! Gracias por tu compra.')
      cart.value = []
      cartOpen.value = false
    }

    function showToast(msg) {
      toastMsg.value = msg
      toastVisible.value = true
      setTimeout(() => { toastVisible.value = false }, 2600)
    }

    return {
      search, selectedCategory, sortBy, cartOpen,
      cart, justAdded, toastVisible, toastMsg,
      categories, products,
      filteredProducts, categoryLabel, cartTotal,
      setCategory, discountedPrice, formatPrice,
      selectColor, addToCart, removeFromCart, checkout, showToast,
    }
  }
})

// ─── REGISTRO DE COMPONENTES ───────────────────────────────
app.component('empty-state', EmptyState)
app.component('product-card', ProductCard)
app.component('cart-drawer', CartDrawer)

// ─── MONTAR APP ────────────────────────────────────────────
app.mount('#app')
