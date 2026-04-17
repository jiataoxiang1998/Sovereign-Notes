<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()
const dates = ref<string[]>([])
const timeframe = ref('all')

const filteredDates = computed(() => {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
  if (timeframe.value === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return dates.value.filter(d => d >= weekAgo && d <= today)
  } else if (timeframe.value === 'month') {
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    return dates.value.filter(d => d >= monthStart && d <= today)
  }
  return dates.value
})

const timeframes = [
  { value: 'all', labelEn: 'All Time', labelZh: '全部' },
  { value: 'month', labelEn: 'This Month', labelZh: '本月' },
  { value: 'week', labelEn: 'Last 7 Days', labelZh: '最近7天' },
]
</script>

<template>
  <div class="p-8">
    <div class="mb-12">
      <h1 class="text-5xl font-extrabold font-['Manrope'] tracking-tighter text-[#e5e2e1] mb-4">
        {{ currentLanguage === 'en' ? 'Historical Archives' : '历史档案' }}
      </h1>
      <p class="text-[#d0c5af] max-w-xl text-lg font-light leading-relaxed">
        {{ currentLanguage === 'en' ? 'Review your journey of productivity.' : '回顾您的生产力历程。' }}
      </p>
    </div>

    <div class="flex gap-4 mb-8">
      <div v-for="tf in timeframes" :key="tf.value" class="flex bg-[#201f1f] rounded-md p-1 border border-[rgba(153,144,124,0.2)]">
        <button 
          @click="timeframe = tf.value"
          :class="timeframe === tf.value ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'"
          class="px-4 py-1.5 text-xs rounded transition-all"
        >
          {{ currentLanguage === 'en' ? tf.labelEn : tf.labelZh }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-6">
        <article v-for="date in filteredDates.slice(0, 10)" :key="date" class="bg-[#201f1f] p-8 rounded-xl border border-[rgba(153,144,124,0.2)]">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] uppercase tracking-widest text-[#f2ca50] font-bold mb-1 block">{{ date }}</span>
              <h3 class="text-2xl font-bold font-['Manrope']">{{ currentLanguage === 'en' ? 'Daily Summary' : '每日总结' }}</h3>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>