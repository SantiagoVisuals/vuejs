// ═══════════════════════════════════════════════════════════
//  EmptyState.js — Estado vacío cuando no hay resultados
// ═══════════════════════════════════════════════════════════

export const EmptyState = {
  name: 'EmptyState',
  props: {
    search: { type: String, default: '' }
  },
  emits: ['clear'],
  template: `
    <div class="empty-state">
      <div class="empty-icon">◎</div>
      <div class="empty-title">Sin resultados</div>
      <div class="empty-sub">No hay productos que coincidan con "{{ search }}"</div>
      <button class="empty-clear" @click="$emit('clear')">Limpiar búsqueda</button>
    </div>
  `
}
