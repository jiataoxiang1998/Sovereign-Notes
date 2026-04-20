<template>
  <div class="fixed inset-0 bg-[#131313]/80 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-6 w-96">
      <h3 class="text-lg font-bold mb-4 text-[#f2ca50]">
        {{ type === 'todos' ? '添加待办事项' : type === 'completed' ? '添加已完成事项' : type === 'issues' ? '发现问题' : '无法解决的问题' }}
      </h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-[#d0c5af] mb-1">标题</label>
          <input 
            v-model="title"
            type="text" 
            class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-[#f2ca50]"
            placeholder="输入标题..."
            @keyup.enter="submit"
          />
        </div>
        <div v-if="type === 'todos'">
          <label class="block text-sm text-[#d0c5af] mb-1">优先级</label>
          <div class="flex gap-2">
            <button @click="priority = 'high'" class="flex-1 py-2 rounded-lg border transition" :class="priority === 'high' ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]' : 'border-[#99907c] text-[#d0c5af]'">高</button>
            <button @click="priority = 'mid'" class="flex-1 py-2 rounded-lg border transition" :class="priority === 'mid' ? 'bg-[#ffb84d]/20 border-[#ffb84d] text-[#ffb84d]' : 'border-[#99907c] text-[#d0c5af]'">中</button>
            <button @click="priority = 'low'" class="flex-1 py-2 rounded-lg border transition" :class="priority === 'low' ? 'bg-[#4ade80]/20 border-[#4ade80] text-[#4ade80]' : 'border-[#99907c] text-[#d0c5af]'">低</button>
          </div>
        </div>
        <div v-if="type === 'issues' || type === 'blockers'">
          <label class="block text-sm text-[#d0c5af] mb-1">严重程度</label>
          <div class="flex gap-2">
            <button @click="severity = 'high'" class="flex-1 py-2 rounded-lg border transition" :class="severity === 'high' ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]' : 'border-[#99907c] text-[#d0c5af]'">严重</button>
            <button @click="severity = 'mid'" class="flex-1 py-2 rounded-lg border transition" :class="severity === 'mid' ? 'bg-[#ffb84d]/20 border-[#ffb84d] text-[#ffb84d]' : 'border-[#99907c] text-[#d0c5af]'">一般</button>
            <button @click="severity = 'low'" class="flex-1 py-2 rounded-lg border transition" :class="severity === 'low' ? 'bg-[#ffe066]/20 border-[#ffe066] text-[#ffe066]' : 'border-[#99907c] text-[#d0c5af]'">轻微</button>
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-6">
        <button 
          @click="$emit('close')"
          class="flex-1 py-2 border border-[#99907c] text-[#d0c5af] rounded-lg hover:border-[#f2ca50] transition"
        >
          取消
        </button>
        <button 
          @click="submit"
          class="flex-1 py-2 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition"
        >
          添加
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Priority, Severity } from '../types'

const props = defineProps<{ type: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'add', item: { title: string; priority?: Priority; severity?: Severity }): void }>()

const title = ref('')
const priority = ref<Priority>('mid')
const severity = ref<Severity>('mid')

const priorities = [
  { value: 'high' as Priority, label: '高', color: 'priorityHigh' },
  { value: 'mid' as Priority, label: '中', color: 'priorityMid' },
  { value: 'low' as Priority, label: '低', color: 'priorityLow' }
]

const severities = [
  { value: 'high' as Severity, label: '严重', color: 'severityHigh' },
  { value: 'mid' as Severity, label: '一般', color: 'severityMid' },
  { value: 'low' as Severity, label: '轻微', color: 'severityLow' }
]

function submit() {
  if (!title.value.trim()) return
  emit('add', { 
    title: title.value, 
    priority: props.type === 'todos' ? priority.value : undefined,
    severity: (props.type === 'issues' || props.type === 'blockers') ? severity.value : undefined
  })
}
</script>