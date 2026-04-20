<template>
  <aside class="w-64 bg-card border-r border-border flex flex-col">
    <div class="p-6">
      <h1 class="text-xl font-bold uppercase tracking-widest text-gold">Sovereign</h1>
      <p class="text-[10px] text-textMuted uppercase tracking-widest mt-1">Work Summary</p>
    </div>
    <nav class="flex-1 py-4">
      <a 
        class="flex items-center gap-4 py-3 px-4 text-gold border-l-2 border-gold bg-card hover:bg-border transition-colors cursor-pointer"
        @click="showHistory = !showHistory"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span>History</span>
      </a>
      <div v-if="showHistory" class="mt-2 max-h-48 overflow-auto">
        <div 
          v-for="date in dates" 
          :key="date"
          class="py-2 px-6 text-textMuted hover:text-gold cursor-pointer text-sm"
          :class="{ 'text-gold': date === activeDate }"
          @click="$emit('selectDate', date)"
        >
          {{ date }}
        </div>
      </div>
    </nav>
    <div class="p-4 space-y-2">
      <button 
        @click="$emit('copyFromLast')"
        class="w-full py-2 border border-[#99907c]/30 text-[#d0c5af] text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:border-[#f2ca50] hover:text-[#f2ca50] transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
        {{ currentLanguage === 'en' ? 'Copy from Last' : '从上次复制' }}
      </button>
      <button 
        @click="$emit('newEntry')"
        class="w-full py-3 bg-gold text-bg font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-goldBright transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Entry
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{ activeDate: string }>()
const emit = defineEmits<{ (e: 'selectDate', date: string): void; (e: 'newEntry'): void; (e: 'copyFromLast'): void }>()

const showHistory = ref(true)
const dates = ref<string[]>([])
const currentLanguage = computed(() => localStorage.getItem('language') || 'en')

onMounted(() => {
  const keys = Object.keys(localStorage)
  dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
})
</script>