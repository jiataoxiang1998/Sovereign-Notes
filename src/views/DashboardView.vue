<script setup lang="ts">
import { computed } from 'vue'
import type { Item, Category, DayData, Priority, Severity } from '../types'

const props = defineProps<{
  data: DayData
  isReadOnly: boolean
  currentLanguage: string
  categories: Category[]
  currentDate: string
  copySuccess: boolean
  todoCategories: { id: string; name: string; items: Item[] }[]
  uncategorizedTodos: Item[]
  completedCategories: { id: string; name: string; items: Item[] }[]
  uncategorizedCompleted: Item[]
  issueCategories: { id: string; name: string; items: Item[] }[]
  uncategorizedIssues: Item[]
  collapsedCategories: Set<string>
  dueDatePickerId: string | null
  categoryPickerId: string | null
  pickerYear: number
  pickerMonth: number
  pickerDays: { day: number; date: string; valid: boolean; isCurrent: boolean }[]
  editingId: string | null
  editingTitle: string
  draggedItem: { type: string; item: Item } | null
  dragOverIndex: { type: string; index: number } | null
}>()

const emit = defineEmits<{
  (e: 'openAddModal', type: string): void
  (e: 'openAddModalWithCategory', type: string, categoryId: string): void
  (e: 'toggleCategoryCollapse', categoryId: string): void
  (e: 'toggleComplete', id: string): void
  (e: 'moveToTodo', item: Item): void
  (e: 'markIssueComplete', item: Item): void
  (e: 'togglePriority', item: Item): void
  (e: 'toggleSeverity', item: Item): void
  (e: 'startEdit', item: Item): void
  (e: 'saveEdit', id: string): void
  (e: 'deleteItem', type: string, id: string): void
  (e: 'initPicker', item: Item): void
  (e: 'changePickerMonth', delta: number): void
  (e: 'confirmDueDate', item: Item, date: string): void
  (e: 'openSummaryModal'): void
  (e: 'showCategoryModal'): void
  (e: 'onDragStart', type: string, item: Item): void
  (e: 'onDragOver', type: string, index: number): void
  (e: 'onDrop', type: string, index: number): void
  (e: 'onDragEnd'): void
  (e: 'setCategoryPicker', id: string | null): void
  (e: 'setDueDatePicker', id: string | null): void
  (e: 'updateEditingTitle', value: string): void
}>()

function getCategoryName(categoryId?: string) {
  if (!categoryId) return ''
  const cat = props.categories.find(c => c.id === categoryId)
  return cat?.name || ''
}
</script>

<template>
  <div v-if="copySuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
    <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
    <span class="text-[#4ade80] text-sm">Copied</span>
  </div>

  <div class="flex justify-between items-end mb-12">
    <div>
      <h2 class="text-5xl font-extrabold font-Manrope tracking-tighter text-[#e5e2e1] mb-2">
        {{ currentLanguage === 'en' ? 'Daily Summary' : '每日总结' }}
        <span v-if="isReadOnly" class="text-sm text-[#99907c] ml-2 font-normal">({{ currentLanguage === 'en' ? 'Read-only' : '只读' }})</span>
      </h2>
      <p class="text-[#d0c5af] font-Inter">{{ currentLanguage === 'en' ? 'Refine your daily output and generate automated work logs.' : '优化您的每日工作输出并生成自动化工作日志。' }}</p>
    </div>
    <div class="flex gap-4">
      <button @click="emit('openSummaryModal')" class="px-8 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold shadow-[0_0_15px_rgba(242,202,80,0.1)] hover:brightness-110 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">auto_awesome</span>
        {{ currentLanguage === 'en' ? 'Generate Summary' : '生成总结' }}
      </button>
      <button @click="emit('showCategoryModal')" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">folder</span>
        {{ currentLanguage === 'en' ? 'Category Management' : '类别管理' }}
      </button>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-6 pb-12">
    <!-- To-do Section -->
    <section class="col-span-12 lg:col-span-7 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative overflow-visible min-h-[400px]">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <span class="font-Manrope text-xs font-bold uppercase tracking-widest text-[#f2ca50]">{{ currentLanguage === 'en' ? '01. To-do' : '01. 待办' }}</span>
        </div>
        <button @click="!isReadOnly && emit('openAddModal', 'todos')" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#f2ca50] hover:text-[#3c2f00] transition-all group">
          <span class="material-symbols-outlined text-sm group-hover:font-bold">add</span>
        </button>
      </div>
      <div class="space-y-3">
        <div v-for="cat in todoCategories" :key="cat.id" class="rounded-lg border border-[#99907c]/20 overflow-visible">
          <div @click="emit('toggleCategoryCollapse', cat.id)" class="flex items-center justify-between p-3 bg-[#2a2a2a]/50 cursor-pointer hover:bg-[#3a3939]">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">
                {{ collapsedCategories.has(cat.id) ? 'chevron_right' : 'expand_more' }}
              </span>
              <span class="text-[#e5e2e1] font-medium">{{ cat.name }}</span>
              <span class="text-xs text-[#99907c]">({{ cat.items.length }})</span>
            </div>
            <button @click.stop="emit('openAddModalWithCategory', 'todos', cat.id)" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50] text-sm">add</button>
          </div>
          <div v-show="!collapsedCategories.has(cat.id)" class="border-t border-[#99907c]/10">
            <div v-for="(item, index) in cat.items" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'todos', item)" @dragover.prevent="emit('onDragOver', 'todos', index)" @drop="emit('onDrop', 'todos', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'todos' && dragOverIndex?.index === index}" class="flex items-center justify-between p-4 rounded-lg bg-[#2a2a2a]/50 hover:bg-[#3a3939] group transition-all cursor-pointer border-b border-[#99907c]/5 last:border-b-0">
              <div class="flex items-center gap-4">
                <div @click="!isReadOnly && emit('toggleComplete', item.id)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
                  <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
                </div>
                <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-[#e5e2e1] font-medium px-2 py-1 rounded w-full outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-[#e5e2e1] font-medium cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
                <button
                  @click.stop="!isReadOnly && emit('togglePriority', item)"
                  :disabled="isReadOnly"
                  class="text-xs px-2 py-0.5 rounded transition-all"
                  :class="[
                    isReadOnly ? 'opacity-50 cursor-not-allowed' : '',
                    item.priority === 'high' ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' :
                    item.priority === 'mid' ? 'bg-[#ffb84d]/20 text-[#ffb84d]' :
                    item.priority === 'low' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                    'bg-[#99907c]/10 text-[#99907c]'
                  ]"
                >{{ !item.priority ? '+' : item.priority === 'high' ? 'H' : item.priority === 'mid' ? 'M' : 'L' }}</button>
                <div class="relative">
                  <button v-if="item.dueDate" @click.stop="!isReadOnly && (emit('setDueDatePicker', dueDatePickerId === item.id ? null : item.id), emit('initPicker', item))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#f2ca50]/20 text-[#f2ca50] flex items-center gap-1 hover:bg-[#f2ca50]/30">
                    <span class="material-symbols-outlined text-[10px]">schedule</span>
                    {{ item.dueDate }}
                  </button>
                  <button v-else @click.stop="!isReadOnly && (emit('setDueDatePicker', dueDatePickerId === item.id ? null : item.id), emit('initPicker', item))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                    <span class="material-symbols-outlined text-[10px]">schedule</span>
                  </button>
                </div>
                <div class="relative">
                  <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                    <span class="material-symbols-outlined text-[10px]">folder</span>
                  </button>
                </div>
              </div>
              <button @click.stop="!isReadOnly && emit('deleteItem', 'todos', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                delete
              </button>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in uncategorizedTodos" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'todos', item)" @dragover.prevent="emit('onDragOver', 'todos', index)" @drop="emit('onDrop', 'todos', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'todos' && dragOverIndex?.index === index}" class="flex items-center justify-between p-4 rounded-lg bg-[#2a2a2a]/50 hover:bg-[#3a3939] group transition-all cursor-pointer">
          <div class="flex items-center gap-4">
            <div @click="!isReadOnly && emit('toggleComplete', item.id)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
            </div>
            <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-[#e5e2e1] font-medium px-2 py-1 rounded w-full outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-[#e5e2e1] font-medium cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
            <button
              @click.stop="!isReadOnly && emit('togglePriority', item)"
              :disabled="isReadOnly"
              class="text-xs px-2 py-0.5 rounded transition-all"
              :class="[
                isReadOnly ? 'opacity-50 cursor-not-allowed' : '',
                item.priority === 'high' ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' :
                item.priority === 'mid' ? 'bg-[#ffb84d]/20 text-[#ffb84d]' :
                item.priority === 'low' ? 'bg-[#4ade80]/20 text-[#4ade80]' :
                'bg-[#99907c]/10 text-[#99907c]'
              ]"
            >{{ !item.priority ? '+' : item.priority === 'high' ? 'H' : item.priority === 'mid' ? 'M' : 'L' }}</button>
            <div class="relative">
              <button v-if="item.dueDate" @click.stop="!isReadOnly && (emit('setDueDatePicker', dueDatePickerId === item.id ? null : item.id), emit('initPicker', item))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#f2ca50]/20 text-[#f2ca50] flex items-center gap-1 hover:bg-[#f2ca50]/30">
                <span class="material-symbols-outlined text-[10px]">schedule</span>
                {{ item.dueDate }}
              </button>
              <button v-else @click.stop="!isReadOnly && (emit('setDueDatePicker', dueDatePickerId === item.id ? null : item.id), emit('initPicker', item))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                <span class="material-symbols-outlined text-[10px]">schedule</span>
              </button>
            </div>
            <div class="relative">
              <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                <span class="material-symbols-outlined text-[10px]">folder</span>
              </button>
            </div>
          </div>
          <button @click.stop="!isReadOnly && emit('deleteItem', 'todos', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
            delete
          </button>
        </div>
        <button v-if="!isReadOnly" @click="emit('openAddModal', 'todos')" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#f2ca50] hover:text-[#f2ca50] transition">
          {{ currentLanguage === 'en' ? '+ Add To-do' : '+ 添加待办' }}
        </button>
      </div>
    </section>

    <!-- Completed Section -->
    <section class="col-span-12 lg:col-span-5 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <span class="font-Manrope text-xs font-bold uppercase tracking-widest text-[#f2ca50]">{{ currentLanguage === 'en' ? '02. Completed' : '02. 已完成' }}</span>
        </div>
        <span class="text-[10px] bg-[#f2ca50]/10 text-[#f2ca50] px-2 py-1 rounded font-bold">{{ data.completed.length }} {{ currentLanguage === 'en' ? 'TODAY' : '今天' }}</span>
      </div>
      <div class="space-y-2 overflow-y-auto pr-2" style="max-height: none;">
        <div v-for="cat in completedCategories" :key="cat.id" class="rounded-lg border border-[#99907c]/20 overflow-visible">
          <div @click="emit('toggleCategoryCollapse', 'completed-' + cat.id)" class="flex items-center justify-between p-2 bg-[#2a2a2a]/50 cursor-pointer hover:bg-[#3a3939]">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">
                {{ collapsedCategories.has('completed-' + cat.id) ? 'chevron_right' : 'expand_more' }}
              </span>
              <span class="text-[#e5e2e1] font-medium text-sm">{{ cat.name }}</span>
              <span class="text-xs text-[#99907c]">({{ cat.items.length }})</span>
            </div>
            <button @click.stop="emit('openAddModalWithCategory', 'completed', cat.id)" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50] text-sm">add</button>
          </div>
          <div v-show="!collapsedCategories.has('completed-' + cat.id)" class="border-t border-[#99907c]/10">
            <div v-for="(item, index) in cat.items" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'completed', item)" @dragover.prevent="emit('onDragOver', 'completed', index)" @drop="emit('onDrop', 'completed', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'completed' && dragOverIndex?.index === index}" class="flex items-center gap-4 p-3 rounded-lg bg-[#1c1b1b]/40 border-l-2 border-[#f2ca50] group">
              <button @click="!isReadOnly && emit('moveToTodo', item)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="material-symbols-outlined text-[#f2ca50] text-sm hover:text-[#4ade80] transition-all">check_circle</button>
              <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
              <span class="text-xs text-[#d0c5af]">{{ item.completedAt?.split('T')[1]?.slice(0, 5) }}</span>
              <div class="relative">
                <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                  <span class="material-symbols-outlined text-[10px]">folder</span>
                </button>
              </div>
              <button @click.stop="!isReadOnly && emit('deleteItem', 'completed', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                delete
              </button>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in uncategorizedCompleted" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'completed', item)" @dragover.prevent="emit('onDragOver', 'completed', index)" @drop="emit('onDrop', 'completed', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'completed' && dragOverIndex?.index === index}" class="flex items-center gap-4 p-3 rounded-lg bg-[#1c1b1b]/40 border-l-2 border-[#f2ca50] group">
          <button @click="!isReadOnly && emit('moveToTodo', item)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="material-symbols-outlined text-[#f2ca50] text-sm hover:text-[#4ade80] transition-all">check_circle</button>
          <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
          <span class="text-xs text-[#d0c5af]">{{ item.completedAt?.split('T')[1]?.slice(0, 5) }}</span>
          <div class="relative">
            <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
              <span class="material-symbols-outlined text-[10px]">folder</span>
            </button>
          </div>
          <button @click.stop="!isReadOnly && emit('deleteItem', 'completed', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
            delete
          </button>
        </div>
        <button v-if="!isReadOnly" @click="emit('openAddModal', 'completed')" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#f2ca50] hover:text-[#f2ca50] transition">
          {{ currentLanguage === 'en' ? '+ Add Completed' : '+ 添加已完成' }}
        </button>
        <div v-if="!completedCategories.length && !uncategorizedCompleted.length" class="flex items-center justify-center py-8 text-[#d0c5af]">
          {{ currentLanguage === 'en' ? 'No completed items' : '暂无已完成项目' }}
        </div>
      </div>
    </section>

    <!-- Issues Section -->
    <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <span class="font-Manrope text-xs font-bold uppercase tracking-widest text-[#f2ca50]">{{ currentLanguage === 'en' ? '03. Identified Issues' : '03. 发现问题' }}</span>
        </div>
      </div>
      <div class="space-y-4">
        <div v-for="cat in issueCategories" :key="cat.id" class="rounded-lg border border-[#99907c]/20 overflow-visible">
          <div @click="emit('toggleCategoryCollapse', 'issues-' + cat.id)" class="flex items-center justify-between p-2 bg-[#2a2a2a]/50 cursor-pointer hover:bg-[#3a3939]">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-[#f2ca50]">
                {{ collapsedCategories.has('issues-' + cat.id) ? 'chevron_right' : 'expand_more' }}
              </span>
              <span class="text-[#e5e2e1] font-medium text-sm">{{ cat.name }}</span>
              <span class="text-xs text-[#99907c]">({{ cat.items.length }})</span>
            </div>
            <button @click.stop="emit('openAddModalWithCategory', 'issues', cat.id)" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50] text-sm">add</button>
          </div>
          <div v-show="!collapsedCategories.has('issues-' + cat.id)" class="border-t border-[#99907c]/10">
            <div v-for="(item, index) in cat.items" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'issues', item)" @dragover.prevent="emit('onDragOver', 'issues', index)" @drop="emit('onDrop', 'issues', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'issues' && dragOverIndex?.index === index}" class="flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a]/50 group border-b border-[#99907c]/5 last:border-b-0">
              <div class="flex items-center gap-3">
                <div @click="!isReadOnly && emit('markIssueComplete', item)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
                  <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
                </div>
                <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-[#e5e2e1] flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-[#e5e2e1] flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
                <button
                  @click.stop="!isReadOnly && emit('toggleSeverity', item)"
                  :disabled="isReadOnly"
                  class="text-xs px-2 py-0.5 rounded transition-all"
                  :class="[
                    isReadOnly ? 'opacity-50 cursor-not-allowed' : '',
                    item.severity === 'high' ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' :
                    item.severity === 'mid' ? 'bg-[#ffb84d]/20 text-[#ffb84d]' :
                    item.severity === 'low' ? 'bg-[#ffe066]/20 text-[#ffe066]' :
                    'bg-[#99907c]/10 text-[#99907c]'
                  ]"
                >{{ !item.severity ? '+' : item.severity === 'high' ? 'High' : item.severity === 'mid' ? 'Mid' : 'Low' }}</button>
                <div class="relative">
                  <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                    <span class="material-symbols-outlined text-[10px]">folder</span>
                  </button>
                </div>
              </div>
              <button @click.stop="!isReadOnly && emit('deleteItem', 'issues', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                delete
              </button>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in uncategorizedIssues" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'issues', item)" @dragover.prevent="emit('onDragOver', 'issues', index)" @drop="emit('onDrop', 'issues', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'issues' && dragOverIndex?.index === index}" class="flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a]/50 group">
          <div class="flex items-center gap-3">
            <div @click="!isReadOnly && emit('markIssueComplete', item)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
            </div>
            <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-[#e5e2e1] flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="emit('startEdit', item)" class="text-[#e5e2e1] flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
            <button
              @click.stop="!isReadOnly && emit('toggleSeverity', item)"
              :disabled="isReadOnly"
              class="text-xs px-2 py-0.5 rounded transition-all"
              :class="[
                isReadOnly ? 'opacity-50 cursor-not-allowed' : '',
                item.severity === 'high' ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]' :
                item.severity === 'mid' ? 'bg-[#ffb84d]/20 text-[#ffb84d]' :
                item.severity === 'low' ? 'bg-[#ffe066]/20 text-[#ffe066]' :
                'bg-[#99907c]/10 text-[#99907c]'
              ]"
            >{{ !item.severity ? '+' : item.severity === 'high' ? 'High' : item.severity === 'mid' ? 'Mid' : 'Low' }}</button>
            <div class="relative">
              <button @click.stop="!isReadOnly && (emit('setCategoryPicker', categoryPickerId === item.id ? null : item.id))" :class="isReadOnly ? 'pointer-events-none' : ''" class="text-xs px-2 py-0.5 rounded bg-[#99907c]/10 text-[#99907c] flex items-center gap-1 hover:bg-[#99907c]/20">
                <span class="material-symbols-outlined text-[10px]">folder</span>
              </button>
            </div>
          </div>
          <button @click.stop="!isReadOnly && emit('deleteItem', 'issues', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
            delete
          </button>
        </div>
        <button @click="!isReadOnly && emit('openAddModal', 'issues')" :class="isReadOnly ? 'hidden' : ''" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
          {{ currentLanguage === 'en' ? '+ Add Issue' : '+ 添加问题' }}
        </button>
      </div>
    </section>

    <!-- Blockers Section -->
    <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <span class="font-Manrope text-xs font-bold uppercase tracking-widest text-[#ffb4ab]">{{ currentLanguage === 'en' ? '04. Blockers' : '04. 无法解决的问题' }}</span>
        </div>
        <span class="material-symbols-outlined text-[#ffb4ab]">warning</span>
      </div>
      <div class="flex flex-col gap-4">
        <div v-for="(item, index) in data.blockers" :key="item.id" draggable="true" @dragstart="emit('onDragStart', 'blockers', item)" @dragover.prevent="emit('onDragOver', 'blockers', index)" @drop="emit('onDrop', 'blockers', index)" @dragend="emit('onDragEnd')" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'blockers' && dragOverIndex?.index === index}" class="flex items-center justify-between bg-[#93000a]/20 p-3 rounded-lg border-l-4 border-[#ffb4ab]">
          <div class="flex items-center gap-3 flex-1">
            <input v-if="editingId === item.id" :value="editingTitle" @input="emit('updateEditingTitle', ($event.target as HTMLInputElement).value)" @blur="emit('saveEdit', item.id)" @keyup.enter="emit('saveEdit', item.id)" class="bg-[#3a3939] text-[#ffdad6] font-bold text-sm px-2 py-1 rounded outline-none border border-[#ffb4ab]" autofocus /><h4 v-else @click="emit('startEdit', item)" class="text-[#ffdad6] font-bold text-sm cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</h4>
            <span class="text-[10px] font-bold text-[#ffb4ab]">CRITICAL</span>
          </div>
          <button @click.stop="!isReadOnly && emit('deleteItem', 'blockers', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-xs text-[#d0c5af] hover:text-[#ffb4ab] transition-all">delete</button>
        </div>
        <button @click="!isReadOnly && emit('openAddModal', 'blockers')" :class="isReadOnly ? 'hidden' : ''" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
          {{ currentLanguage === 'en' ? 'Report New Blocker' : '报告新阻塞' }}
        </button>
      </div>
    </section>
  </div>

  <div class="mt-8 flex gap-6 items-center">
    <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
    <div class="flex items-center gap-2 text-[#d0c5af] text-[10px] uppercase tracking-[0.2em] font-Manrope">
      <span class="material-symbols-outlined text-xs">history_toggle_off</span>
      {{ currentLanguage === 'en' ? 'Last synced just now' : '刚刚同步' }}
    </div>
    <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
  </div>
</template>