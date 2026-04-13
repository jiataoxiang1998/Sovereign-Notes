<template>
  <section class="bg-card p-6 rounded-xl border border-border hover:border-gold transition">
    <div class="flex justify-between items-center mb-4">
      <div>
        <span class="text-gold text-xs font-bold uppercase tracking-widest">02. 已完成事项</span>
        <h3 class="text-xl font-bold">Completed</h3>
      </div>
      <span class="text-xs bg-gold/10 text-gold px-2 py-1 rounded font-bold">{{ items.length }} TODAY</span>
    </div>
    <div class="space-y-2 max-h-64 overflow-auto">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="flex items-center gap-3 p-3 rounded-lg bg-border/50 hover:bg-border group cursor-pointer"
        @click="toggleSelect(item.id)"
      >
        <div 
          class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
          :class="selected.includes(item.id) ? 'bg-gold border-gold' : 'border-textDim'"
        >
          <svg v-if="selected.includes(item.id)" class="w-3 h-3 text-bg" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="flex-1 text-text line-through decoration-gold/40">{{ item.title }}</span>
        <span class="text-xs text-textMuted">{{ item.completedAt?.split('T')[1]?.slice(0, 5) }}</span>
      </div>
      <div v-if="!items.length" class="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-textDim">
        <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-xs">暂无已完成事项</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Item } from '../types'

defineProps<{ items: Item[] }>()
defineEmits<{ (e: 'add'): void; (e: 'delete', type: string, ids: string[]): void }>()

const selected = defineModel<string[]>('selected', { default: [] })

function toggleSelect(id: string) {
  const idx = selected.value.indexOf(id)
  if (idx > -1) {
    selected.value.splice(idx, 1)
  } else {
    selected.value.push(id)
  }
}
</script>