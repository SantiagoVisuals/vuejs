// ═══════════════════════════════════════════════════════════
//  utils.js — Funciones utilitarias compartidas
// ═══════════════════════════════════════════════════════════

/**
 * Calcula el precio con descuento aplicado
 * @param {Object} product - Producto con price y discount
 * @returns {number} Precio final
 */
export function discountedPrice(product) {
  if (product.discount > 0) {
    return Math.round(product.price * (1 - product.discount / 100))
  }
  return product.price
}

/**
 * Formatea un número como precio colombiano
 * @param {number} num - Número a formatear
 * @returns {string} Precio formateado (ej: "289.000")
 */
export function formatPrice(num) {
  return num.toLocaleString('es-CO')
}
