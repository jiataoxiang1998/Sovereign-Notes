<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

const { currentLanguage } = useLanguage()
</script>

<template>
  <div class="p-8">
    <!-- Page Header -->
    <div class="flex justify-between items-end mb-12">
      <div>
        <h2 class="text-5xl font-extrabold font-['Manrope'] tracking-tighter text-[#e5e2e1] mb-2">
          {{ currentLanguage === 'en' ? 'Daily Summary' : '每日总结' }}
        </h2>
        <p class="text-[#d0c5af] font-['Inter']">
          {{ currentLanguage === 'en' ? 'Refine your daily output and generate automated work logs.' : '优化您的每日工作输出并生成自动化工作日志。' }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-6 pb-12">
      <section class="col-span-12 lg:col-span-7 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] min-h-[400px]">
        <h3 class="text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-6">
          {{ currentLanguage === 'en' ? '01. To-do' : '01. 待办' }}
        </h3>
        <p class="text-[#d0c5af]">To-do items will be rendered here</p>
      </section>

      <section class="col-span-12 lg:col-span-5 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
        <h3 class="text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-6">
          {{ currentLanguage === 'en' ? '02. Completed' : '02. 已完成' }}
        </h3>
        <p class="text-[#d0c5af]">Completed items will be rendered here</p>
      </section>

      <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
        <h3 class="text-xs font-bold uppercase tracking-widest text-[#f2ca50] mb-6">
          {{ currentLanguage === 'en' ? '03. Identified Issues' : '03. 发现问题' }}
        </h3>
        <p class="text-[#d0c5af]">Issues will be rendered here</p>
      </section>

      <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
        <h3 class="text-xs font-bold uppercase tracking-widest text-[#ffb4ab] mb-6">
          {{ currentLanguage === 'en' ? '04. Blockers' : '04. 阻塞问题' }}
        </h3>
        <p class="text-[#d0c5af]">Blockers will be rendered here</p>
      </section>
    </div>
  </div>
</template>