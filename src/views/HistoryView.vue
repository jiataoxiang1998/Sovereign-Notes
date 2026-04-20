<script setup lang="ts">
import type { DayData, Category } from '../types'

defineProps<{
  currentLanguage: string
  copySuccess: boolean
  dates: string[]
  filteredDates: string[]
  timeframe: string
  calendarDays: { day: number; date: string; hasData: boolean }[]
  displayMonth: string
  currentDate: string
  categories: Category[]
  itemCounts: Record<string, { todos: number; completed: number }>
}>()

const emit = defineEmits<{
  (e: 'setTimeframe', value: string): void
  (e: 'changeMonth', delta: number): void
  (e: 'showHistoryModal', date: string): void
  (e: 'copyHistorySummaryByDate', date: string): void
  (e: 'showImportHelp'): void
  (e: 'showCategoryModal'): void
  (e: 'exportData'): void
  (e: 'importData', event: Event): void
}>()

function formatDateFull(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function getItemCount(date: string) {
  return { todos: 0, completed: 0 }
}
</script>

<template>
  <section class="mb-16">
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-5xl font-extrabold font-Manrope tracking-tighter text-[#e5e2e1] mb-4">{{ currentLanguage === 'en' ? 'Historical Archives' : '历史档案' }}</h1>
        <p class="text-[#d0c5af] max-w-xl text-lg font-light leading-relaxed">{{ currentLanguage === 'en' ? 'Review your journey of productivity. Every summary is a testament to your discipline.' : '回顾您的生产力历程。每份总结都是您自律的见证。' }}</p>
      </div>
      <div class="flex gap-3">
        <button @click="emit('showImportHelp')" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">help</span>
          {{ currentLanguage === 'en' ? 'Import Help' : '导入帮助' }}
        </button>
        <button @click="emit('showCategoryModal')" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">folder</span>
          {{ currentLanguage === 'en' ? 'Category Management' : '类别管理' }}
        </button>
        <button @click="emit('exportData')" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
          <span class="material-symbols-outlined text-sm">download</span>
          {{ currentLanguage === 'en' ? 'Export Data' : '导出数据' }}
        </button>
        <label class="px-4 py-2 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined text-sm">upload</span>
          {{ currentLanguage === 'en' ? 'Import Data' : '导入数据' }}
          <input type="file" accept=".json" class="hidden" @change="(e) => emit('importData', e)"/>
        </label>
      </div>
    </div>
  </section>

  <div v-if="copySuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
    <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
    <span class="text-[#4ade80] text-sm">Copied</span>
  </div>

  <div class="flex flex-wrap justify-between items-end mb-12 gap-6">
    <div class="flex gap-4">
      <div class="flex flex-col space-y-2">
        <span class="text-[10px] uppercase tracking-widest text-[#f2ca50] font-bold">{{ currentLanguage === 'en' ? 'Timeframe' : '时间范围' }}</span>
        <div class="flex bg-[#201f1f] rounded-md p-1 border border-[rgba(153,144,124,0.2)]">
          <button @click="emit('setTimeframe', 'all')" :class="timeframe === 'all' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">{{ currentLanguage === 'en' ? 'All Time' : '全部' }}</button>
          <button @click="emit('setTimeframe', 'month')" :class="timeframe === 'month' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">{{ currentLanguage === 'en' ? 'This Month' : '本月' }}</button>
          <button @click="emit('setTimeframe', 'week')" :class="timeframe === 'week' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">{{ currentLanguage === 'en' ? 'Last 7 Days' : '最近7天' }}</button>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 space-y-6">
      <article v-for="date in filteredDates.slice(0, 5)" :key="date" class="bg-[#201f1f] p-8 rounded-xl border border-[rgba(153,144,124,0.2)] relative overflow-hidden group cursor-pointer" @click="emit('showHistoryModal', date)">
        <div class="absolute top-0 left-0 w-1 h-full bg-[#f2ca50] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-[10px] uppercase tracking-widest text-[#f2ca50] font-bold mb-1 block">{{ formatDateFull(date) }}</span>
            <h3 class="text-2xl font-bold font-Manrope">{{ currentLanguage === 'en' ? 'Daily Summary' : '每日总结' }}</h3>
          </div>
          <div class="flex gap-2">
            <button @click.stop="emit('copyHistorySummaryByDate', date)" class="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] rounded-lg hover:text-[#f2ca50] transition-colors border border-[rgba(153,144,124,0.2)]" title="Copy Summary">
              <span class="material-symbols-outlined">content_copy</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-[10px] uppercase text-[#d0c5af] font-bold mb-2 tracking-tighter">{{ currentLanguage === 'en' ? 'Summary' : '摘要' }}</p>
            <ul class="space-y-2 text-sm text-[#e5e2e1]/90">
<li class="flex items-start"><span class="material-symbols-outlined text-[#f2ca50] text-xs mr-2 mt-0.5">check_circle</span> {{ itemCounts[date]?.todos || 0 }} {{ currentLanguage === 'en' ? 'Tasks' : '任务' }}</li>
                      <li class="flex items-start"><span class="material-symbols-outlined text-[#f2ca50] text-xs mr-2 mt-0.5">check_circle</span> {{ itemCounts[date]?.completed || 0 }} {{ currentLanguage === 'en' ? 'Completed' : '已完成' }}</li>
            </ul>
          </div>
        </div>
      </article>
    </div>

    <div class="lg:col-span-4 space-y-8">
      <div class="bg-[#201f1f] p-6 rounded-xl border border-[rgba(153,144,124,0.2)]">
        <div class="flex justify-between items-center mb-6">
          <h5 class="font-bold text-sm uppercase tracking-widest text-[#f2ca50]">{{ displayMonth }}</h5>
          <div class="flex gap-2">
            <button @click="emit('changeMonth', -1)" class="material-symbols-outlined text-sm">chevron_left</button>
            <button @click="emit('changeMonth', 1)" class="material-symbols-outlined text-sm">chevron_right</button>
          </div>
        </div>
        <div class="grid grid-cols-7 gap-2 text-center text-[10px] text-[#d0c5af] mb-4">
          <span>{{ currentLanguage === 'en' ? 'S' : '日' }}</span><span>{{ currentLanguage === 'en' ? 'M' : '一' }}</span><span>{{ currentLanguage === 'en' ? 'T' : '二' }}</span><span>{{ currentLanguage === 'en' ? 'W' : '三' }}</span><span>{{ currentLanguage === 'en' ? 'T' : '四' }}</span><span>{{ currentLanguage === 'en' ? 'F' : '五' }}</span><span>{{ currentLanguage === 'en' ? 'S' : '六' }}</span>
        </div>
        <div class="grid grid-cols-7 gap-2 text-center">
          <template v-for="day in calendarDays" :key="day.date">
            <button v-if="day.day > 0" @click="day.hasData && emit('showHistoryModal', day.date)" class="text-xs py-2 rounded transition" :class="{'bg-[#f2ca50]/40 text-[#f2ca50] font-bold': day.date === currentDate, 'text-[#f2ca50]': day.hasData && day.date !== currentDate, 'text-[#99907c] opacity-40': !day.hasData}" :disabled="!day.hasData">{{ day.day }}</button>
            <span v-else class="text-xs"></span>
          </template>
        </div>
      </div>

      <div class="bg-[#201f1f] p-6 rounded-xl border border-[rgba(153,144,124,0.2)]">
        <p class="text-[10px] uppercase text-[#f2ca50] font-bold mb-4 tracking-widest">{{ currentLanguage === 'en' ? 'Monthly Stats' : '月度统计' }}</p>
        <div class="space-y-4">
          <div>
            <p class="text-3xl font-extrabold">{{ filteredDates.length }} <span class="text-sm font-light text-[#d0c5af]">{{ currentLanguage === 'en' ? 'days' : '天' }}</span></p>
            <p class="text-xs text-[#d0c5af] mt-1">{{ currentLanguage === 'en' ? 'Total Entries' : '总记录数' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>