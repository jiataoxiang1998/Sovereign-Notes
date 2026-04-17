<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  currentView: string
}>()

const emit = defineEmits<{
  (e: 'change', view: string): void
}>()

const navItems = [
  { id: 'dashboard', icon: 'dashboard', labelEn: 'Dashboard', labelZh: '仪表盘' },
  { id: 'history', icon: 'history', labelEn: 'History', labelZh: '历史' },
  { id: 'chat', icon: 'chat', labelEn: 'Chat', labelZh: '聊天' },
]

function select(view: string) {
  emit('change', view)
}
</script>

<template>
  <aside class="bg-[#0E0E0E] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-50">
    <div class="px-8 mb-12 flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f2ca50] to-[#b8860b] flex items-center justify-center shadow-lg shadow-[#f2ca50]/20">
        <svg class="w-5 h-5 text-[#1a1a1a]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
      </div>
      <div>
        <h1 class="text-xl font-bold uppercase tracking-widest text-[#D4AF37] font-['Manrope']">Sovereign</h1>
        <p class="text-[10px] text-[#d0c5af] uppercase tracking-widest mt-1 opacity-60 font-['Manrope']">Work Summary</p>
      </div>
    </div>
    
    <nav class="flex-1 space-y-2">
      <a 
        v-for="item in navItems" 
        :key="item.id"
        @click="select(item.id)"
        class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer"
        :class="{ 'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === item.id }"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span>{{ item.labelEn }}</span>
      </a>
    </nav>
  </aside>
</template>