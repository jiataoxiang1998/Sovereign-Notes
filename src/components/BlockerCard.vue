<template>
  <section class="bg-card p-6 rounded-xl border border-border hover:border-gold transition">
    <div class="flex justify-between items-center mb-4">
      <div>
        <span class="text-error text-xs font-bold uppercase tracking-widest">04. 无法解决的问题</span>
        <h3 class="text-xl font-bold">Blockers</h3>
      </div>
      <svg class="w-5 h-5 text-error" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="space-y-2">
      <div 
        v-for="item in items" 
        :key="item.id"
        class="flex items-center gap-3 p-3 rounded-lg bg-error/10 border-l-2 border-error"
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
        <span class="flex-1 text-text">{{ item.title }}</span>
        <span 
          class="text-xs px-2 py-0.5 rounded"
          :class="{
            'bg-severityHigh/20 text-severityHigh': item.severity === 'high',
            'bg-severityMid/20 text-severityMid': item.severity === 'mid',
            'bg-severityLow/20 text-severityLow': item.severity === 'low'
          }"
        >
          {{ item.severity === 'high' ? '严重' : item.severity === 'mid' ? '一般' : '轻微' }}
        </span>
        <button 
          @click.stop="$emit('delete', 'blockers', [item.id])"
          class="p-1 hover:text-error transition"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <button 
        @click="$emit('add')"
        class="w-full py-2 border border-dashed border-border rounded-lg text-xs font-bold text-textMuted hover:border-error hover:text-error transition"
      >
        + 添加阻碍
      </button>
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