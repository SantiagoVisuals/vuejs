// ═══════════════════════════════════════════════════════════
//  CartDrawer.js — Panel lateral del carrito de compras
//  Muestra items, total y botón de checkout
// ═══════════════════════════════════════════════════════════

import { formatPrice } from '../utils.js'

export const CartDrawer = {
  name: 'CartDrawer',
  props: {
    open:      { type: Boolean, default: false },
    cart:      { type: Array, default: () => [] },
    cartTotal: { type: Number, default: 0 }
  },
  emits: ['close', 'remove', 'checkout'],
  methods: {
    formatPrice
  },
  template: `
    <div class="overlay" :class="{ open: open }" @click="$emit('close')"></div>
    <div class="cart-drawer" :class="{ open: open }">
      <div class="drawer-header">
        <span class="drawer-title">Carrito</span>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Vacío con v-if -->
      <div class="cart-empty" v-if="cart.length === 0">
        <div class="cart-empty-icon">◻</div>
        <div class="cart-empty-txt">Tu carrito está vacío</div>
      </div>

      <!-- Items con v-else + v-for -->
      <template v-else>
        <div class="cart-item" v-for="(item, i) in cart" :key="i">
          <div class="cart-item-icon">{{ item.emoji }}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">{{ item.name }}</div>
            <div class="cart-item-price">\${{ formatPrice(item.finalPrice) }}</div>
          </div>
          <button class="cart-item-remove" @click="$emit('remove', i)">✕</button>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span class="cart-total-label">Total</span>
            <span class="cart-total-val">\${{ formatPrice(cartTotal) }}</span>
          </div>
          <button class="checkout-btn" @click="$emit('checkout')">Finalizar compra</button>
        </div>
      </template>
    </div>
  `
}
