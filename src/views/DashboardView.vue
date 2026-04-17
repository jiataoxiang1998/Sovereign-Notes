<script setup lang="ts">
import { computed } from 'vue'
import { useDayData } from '../composables/useDayData'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage, toggle } = useLanguage()
const { data } = useDayData()

const priorities = computed(() => [
  { value: 'high' as const, label: currentLanguage.value === 'en' ? 'High' : '高', color: '#ffb4ab' },
  { value: 'mid' as const, label: currentLanguage.value === 'en' ? 'Mid' : '中', color: '#ffb84d' },
  { value: 'low' as const, label: currentLanguage.value === 'en' ? 'Low' : '低', color: '#4ade80' },
])
</script>

<template>
  <div class="h-screen flex flex-col bg-[#131313] text-[#e5e2e1] font-['Inter']">
    <!-- Header -->
    <header class="h-12 w-full fixed top-0 z-40 bg-[#131313] flex justify-between items-center px-8 font-['Manrope'] font-light border-b border-[#f2ca50]/10">
      <span class="text-[#d0c5af] text-xs tracking-widest uppercase opacity-60">Sovereign Notes</span>
      <div class="flex items-center gap-3">
        <button @click="toggle" class="text-xs px-2 py-1 rounded bg-[#2a2a2a] text-[#d0c5af] hover:bg-[#3a3939] transition border border-[#99907c]/30">
          {{ currentLanguage === 'en' ? '中文' : 'EN' }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mt-12 p-8 flex-1 bg-[#0e0e0e] overflow-y-auto">
      <div class="grid grid-cols-12 gap-6 pb-12">
        <!-- To-do Cards would go here -->
        <section class="col-span-12 lg:col-span-7 bg-[#201f1f] p-8 rounded-xl border-0.5 border-[rgba(153,144,124,0.2)]">
          <h2 class="text-2xl font-bold font-['Manrope']">Dashboard</h2>
          <p class="text-[#d0c5af] mt-2">Daily Summary content would go here</p>
        </section>
      </div>
    </main>
  </div>
</template>