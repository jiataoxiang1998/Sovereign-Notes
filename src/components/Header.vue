<script setup lang="ts">
import { ref } from 'vue'

const currentLanguage = ref(localStorage.getItem('language') || 'en')

function toggleLanguage() {
  currentLanguage.value = currentLanguage.value === 'en' ? 'zh' : 'en'
  localStorage.setItem('language', currentLanguage.value)
}

function minimize() {
  window.electronAPI?.minimize()
}

function maximize() {
  window.electronAPI?.maximize()
}

function close() {
  window.electronAPI?.close()
}
</script>

<template>
  <header class="h-12 w-full fixed top-0 z-40 bg-[#131313] flex justify-between items-center px-8 font-['Manrope'] font-light border-b border-[#f2ca50]/10" style="-webkit-app-region: drag; position: relative;">
    <div class="flex items-center" style="-webkit-app-region: no-drag;">
      <span class="text-[#d0c5af] text-xs tracking-widest uppercase opacity-60">Sovereign Notes</span>
    </div>
    <div class="flex items-center gap-3" style="-webkit-app-region: no-drag;">
      <button @click="toggleLanguage" class="text-xs px-2 py-1 rounded bg-[#2a2a2a] text-[#d0c5af] hover:bg-[#3a3939] transition border border-[#99907c]/30">
        {{ currentLanguage === 'en' ? '中文' : 'EN' }}
      </button>
      <button @click="minimize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="Minimize">
        <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
      </button>
      <button @click="maximize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="Maximize">
        <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5 5m11 1l-5-5m-4 0h4m-4 0l-5-5"/></svg>
      </button>
      <button @click="close" class="w-10 h-8 flex items-center justify-center hover:bg-[#93000a] rounded transition" title="Close">
        <svg class="w-4 h-4 text-[#d0c5af] hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  </header>
</template>