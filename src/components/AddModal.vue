<template>
  <div class="fixed inset-0 bg-bg/80 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-card rounded-xl border border-gold p-6 w-96">
      <h3 class="text-lg font-bold mb-4 text-gold">
        {{ type === 'todos' ? '添加待办事项' : type === 'completed' ? '添加已完成事项' : type === 'issues' ? '发现问题' : '无法解决的问题' }}
      </h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-textMuted mb-1">标题</label>
          <input 
            v-model="title"
            type="text" 
            class="w-full bg-border text-text px-3 py-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-gold"
            placeholder="输入标题..."
            @keyup.enter="submit"
          />
        </div>
        <div v-if="type === 'todos'">
          <label class="block text-sm text-textMuted mb-1">优先级</label>
          <div class="flex gap-2">
            <button 
              v-for="p in priorities" 
              :key="p.value"
              @click="priority = p.value"
              class="flex-1 py-2 rounded-lg border transition"
              :class="priority === p.value ? `bg-${p.color}/20 border-${p.color} text-${p.color}` : 'border-border text-textMuted'"
            >
              {{ p.label }}
            </button>
          </div>
        </div>
        <div v-if="type === 'issues' || type === 'blockers'">
          <label class="block text-sm text-textMuted mb-1">严重程度</label>
          <div class="flex gap-2">
            <button 
              v-for="s in severities" 
              :key="s.value"
              @click="severity = s.value"
              class="flex-1 py-2 rounded-lg border transition"
              :class="severity === s.value ? `bg-${s.color}/20 border-${s.color} text-${s.color}` : 'border-border text-textMuted'"
            >
              {{ s.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-6">
        <button 
          @click="$emit('close')"
          class="flex-1 py-2 border border-border text-textMuted rounded-lg hover:border-gold transition"
        >
          取消
        </button>
        <button 
          @click="submit"
          class="flex-1 py-2 bg-gold text-bg font-bold rounded-lg hover:bg-goldBright transition"
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