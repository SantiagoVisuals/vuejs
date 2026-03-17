// ═══════════════════════════════════════════════════════════
//  ProductCard.js — Tarjeta individual de producto
//  Incluye badges, rating, selector de color y botón de carrito
// ═══════════════════════════════════════════════════════════

import { discountedPrice, formatPrice } from '../utils.js'

export const ProductCard = {
  name: 'ProductCard',
  props: {
    product:   { type: Object, required: true },
    justAdded: { type: Number, default: null }
  },
  emits: ['add-to-cart', 'select-color'],
  methods: {
    discountedPrice,
    formatPrice
  },
  template: `
    <div class="product-card" :class="{ featured: product.featured }">
      <!-- Imagen / Emoji -->
      <div class="product-img" :style="{ background: product.bgColor }">
        <span>{{ product.emoji }}</span>
        <!-- Badge condicional: v-if / v-else-if / v-else -->
        <span v-if="product.stock === 0" class="product-badge badge-sold">Agotado</span>
        <span v-else-if="product.isNew" class="product-badge badge-new">Nuevo</span>
        <span v-else-if="product.discount > 0" class="product-badge badge-sale">-{{ product.discount }}%</span>
      </div>

      <!-- Info -->
      <div class="product-info">
        <div class="product-category">{{ product.category }}</div>
        <div class="product-name">{{ product.name }}</div>
        <div class="product-brand">{{ product.brand }}</div>

        <!-- Precio con v-if descuento -->
        <div class="product-price-row">
          <span class="product-price">
            \${{ formatPrice(discountedPrice(product)) }}
          </span>
          <span class="product-price-original" v-if="product.discount > 0">
            \${{ formatPrice(product.price) }}
          </span>
        </div>

        <!-- Estrellas (v-for) -->
        <div class="product-rating">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{ filled: n <= product.rating }"
          >★</span>
        </div>

        <!-- Colores (v-for + :class dinámico) -->
        <div class="product-colors">
          <div
            v-for="(color, ci) in product.colors"
            :key="ci"
            class="color-dot"
            :style="{ background: color }"
            :class="{ selected: product.selectedColor === ci }"
            @click="$emit('select-color', product, ci)"
          ></div>
        </div>

        <!-- Botón añadir al carrito -->
        <button
          class="add-to-cart-btn"
          :class="{ added: justAdded === product.id }"
          :disabled="product.stock === 0"
          @click="$emit('add-to-cart', product)"
        >
          <span v-if="product.stock === 0">Agotado</span>
          <span v-else-if="justAdded === product.id">✓ Añadido</span>
          <span v-else>+ Añadir al carrito</span>
        </button>
      </div>
    </div>
  `
}
