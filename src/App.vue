<template>
  <div class="h-screen flex bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Inter']">
    <!-- SideNavBar -->
    <aside class="bg-[#0E0E0E] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-50">
      <div class="px-8 mb-12">
        <h1 class="text-xl font-bold uppercase tracking-widest text-[#D4AF37] font-['Manrope']">Sovereign</h1>
        <p class="text-[10px] text-[#d0c5af] uppercase tracking-widest mt-1 opacity-60 font-['Manrope']">Work Summary</p>
      </div>
      <div class="px-6 mb-10">
        <button @click="showAddModal = true" class="w-full py-3 bg-[#D4AF37] text-[#3c2f00] font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all">
          <span class="material-symbols-outlined text-sm">add</span>
          New Entry
        </button>
      </div>
      <nav class="flex-1 space-y-2">
        <a class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#D4AF37] font-bold border-l-2 border-[#D4AF37] pl-4 font-['Manrope']" href="#">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a @click="showHistory = !showHistory" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer">
          <span class="material-symbols-outlined">history</span>
          <span>History</span>
        </a>
        <div v-if="showHistory" class="mt-2 max-h-48 overflow-auto">
          <div v-for="date in dates" :key="date" class="py-2 pl-12 text-[#d0c5af] hover:text-[#F2CA50] cursor-pointer text-xs font-['Manrope'] uppercase" :class="{ 'text-[#D4AF37]': date === currentDate }" @click="selectDate(date)">
            {{ date }}
          </div>
        </div>
      </nav>
      <div class="px-6 mt-auto">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-[#d0c5af]">person</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold">User</span>
            <span class="text-[10px] text-[#d0c5af]">Daily Worker</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="pl-64 h-screen flex flex-col w-full">
      <!-- TopNavBar -->
      <header class="h-16 w-full fixed top-0 z-40 bg-[#131313] flex justify-between items-center px-8 font-['Manrope'] font-light" style="-webkit-app-region: drag; position: relative;">
        <div class="flex items-center gap-8">
          <span class="text-[#F2CA50] border-b-2 border-[#F2CA50] pb-1 cursor-pointer">Focus</span>
          <span class="text-[#d0c5af] hover:text-[#F2CA50] transition-opacity cursor-pointer">Analytics</span>
          <span class="text-[#d0c5af] hover:text-[#F2CA50] transition-opacity cursor-pointer">Settings</span>
        </div>
        <div class="flex items-center gap-6" style="-webkit-app-region: no-drag;">
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3 text-[#d0c5af] text-sm">search</span>
            <input class="bg-[#353534] border-none rounded-md py-1.5 pl-10 pr-4 text-xs w-64 focus:ring-1 focus:ring-[#f2ca50] outline-none transition-all" placeholder="Search tasks..." type="text"/>
          </div>
        </div>
        <div class="flex items-center gap-2" style="-webkit-app-region: no-drag;">
          <button @click="minimize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="最小化">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
          </button>
          <button @click="maximize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="最大化">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5 5m11 1l-5-5m-4 0h4m-4 0l-5-5"/></svg>
          </button>
          <button @click="close" class="w-10 h-8 flex items-center justify-center hover:bg-[#93000a] rounded transition" title="关闭">
            <svg class="w-4 h-4 text-[#d0c5af] hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </header>

      <!-- Content Canvas -->
      <div class="mt-16 p-10 overflow-y-auto flex-1 bg-[#0e0e0e]">
        <!-- Page Header -->
        <div class="flex justify-between items-end mb-12">
          <div>
            <h2 class="text-5xl font-extrabold font-['Manrope'] tracking-tighter text-[#e5e2e1] mb-2">Daily Summary</h2>
            <p class="text-[#d0c5af] font-['Inter']">Refine your daily output and generate automated work logs.</p>
          </div>
          <div class="flex gap-4">
            <button @click="bulkDelete" class="px-6 py-2.5 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">delete_sweep</span>
              Bulk Delete
            </button>
            <button @click="generateSummary" class="px-8 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold shadow-[0_0_15px_rgba(242,202,80,0.1)] hover:brightness-110 transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-sm">auto_awesome</span>
              Generate Summary & Copy
            </button>
          </div>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-12 gap-6 pb-12">
          <!-- To-do Items -->
          <section class="col-span-12 lg:col-span-7 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative overflow-hidden min-h-[400px]">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">01. 待办事项</span>
                <h3 class="text-2xl font-bold font-['Manrope']">To-do Items</h3>
              </div>
              <button @click="openAddModal('todos')" class="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#f2ca50] hover:text-[#3c2f00] transition-all group">
                <span class="material-symbols-outlined text-sm group-hover:font-bold">add</span>
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="item in data.todos" :key="item.id" class="flex items-center justify-between p-4 rounded-lg bg-[#2a2a2a]/50 hover:bg-[#3a3939] group transition-all cursor-pointer">
                <div class="flex items-center gap-4">
                  <div @click="toggleComplete(item.id)" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
                    <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
                  </div>
                  <span class="text-[#e5e2e1] font-medium">{{ item.title }}</span>
                </div>
                <button @click.stop="deleteItem('todos', item.id)" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                  delete
                </button>
              </div>
              <div v-if="!data.todos.length" class="border-2 border-dashed border-[#99907c]/20 rounded-lg p-6 flex flex-col items-center justify-center text-[#d0c5af]/40 mt-4">
                <span class="material-symbols-outlined text-4xl mb-2">note_add</span>
                <p class="text-xs">Add more tasks to your workflow</p>
              </div>
            </div>
          </section>

          <!-- Completed Tasks -->
          <section class="col-span-12 lg:col-span-5 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">02. 已完成事项</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Completed</h3>
              </div>
              <span class="text-[10px] bg-[#f2ca50]/10 text-[#f2ca50] px-2 py-1 rounded font-bold">{{ data.completed.length }} TODAY</span>
            </div>
            <div class="space-y-2 overflow-y-auto max-h-[300px] pr-2">
              <div v-for="item in data.completed" :key="item.id" class="flex items-center gap-4 p-3 rounded-lg bg-[#1c1b1b]/40 border-l-2 border-[#f2ca50] group">
                <span class="material-symbols-outlined text-[#f2ca50] text-sm">check_circle</span>
                <span class="text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1">{{ item.title }}</span>
                <span class="text-xs text-[#d0c5af]">{{ item.completedAt?.split('T')[1]?.slice(0, 5) }}</span>
                <button @click.stop="deleteItem('completed', item.id)" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                  delete
                </button>
              </div>
              <div v-if="!data.completed.length" class="flex items-center justify-center py-8 text-[#d0c5af]">
                No completed items
              </div>
            </div>
          </section>

          <!-- Identified Issues -->
          <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">03. 发现问题</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Identified Issues</h3>
              </div>
            </div>
            <div class="space-y-4">
              <div v-for="item in data.issues" :key="item.id" class="p-4 rounded-lg bg-[#2a2a2a]/50 group">
                <div class="flex items-center justify-between">
                  <span class="text-[#e5e2e1]">{{ item.title }}</span>
                  <span class="text-xs px-2 py-0.5 rounded" :class="{
                    'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                    'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                    'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                  }">{{ item.severity === 'high' ? '严重' : item.severity === 'mid' ? '一般' : '轻微' }}</span>
                </div>
                <button @click.stop="deleteItem('issues', item.id)" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all mt-2">
                  delete
                </button>
              </div>
              <button @click="openAddModal('issues')" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
                + 添加问题
              </button>
            </div>
          </section>

          <!-- Unresolved Blockers -->
          <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#ffb4ab] font-['Manrope'] text-xs font-bold uppercase tracking-widest">04. 无法解决的问题</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Blockers</h3>
              </div>
              <span class="material-symbols-outlined text-[#ffb4ab]">warning</span>
            </div>
            <div class="flex flex-col gap-4">
              <div v-for="item in data.blockers" :key="item.id" class="bg-[#93000a]/20 p-4 rounded-lg border-l-4 border-[#ffb4ab]">
                <div class="flex justify-between items-start">
                  <h4 class="text-[#ffdad6] font-bold text-sm">{{ item.title }}</h4>
                  <span class="text-[10px] font-bold text-[#ffb4ab]">CRITICAL</span>
                </div>
                <button @click.stop="deleteItem('blockers', item.id)" class="material-symbols-outlined text-xs text-[#d0c5af] hover:text-[#ffb4ab] mt-2">delete</button>
              </div>
              <button @click="openAddModal('blockers')" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
                Report New Blocker
              </button>
            </div>
          </section>
        </div>

        <!-- Contextual Insight Footer -->
        <div class="mt-8 flex gap-6 items-center">
          <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
          <div class="flex items-center gap-2 text-[#d0c5af] text-[10px] uppercase tracking-[0.2em] font-['Manrope']">
            <span class="material-symbols-outlined text-xs">history_toggle_off</span>
            Last synced just now
          </div>
          <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
        </div>
      </div>
    </main>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-6 w-96">
        <h3 class="text-lg font-bold mb-4 text-[#f2ca50] font-['Manrope']">
          {{ addType === 'todos' ? '添加待办事项' : addType === 'completed' ? '添加已完成' : addType === 'issues' ? '发现问题' : '无法解决的问题' }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-[#d0c5af] mb-1">标题</label>
            <input v-model="addTitle" type="text" class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-[#f2ca50]" placeholder="输入标题..." @keyup.enter="submitAdd"/>
          </div>
          <div v-if="addType === 'todos'">
            <label class="block text-sm text-[#d0c5af] mb-1">优先级</label>
            <div class="flex gap-2">
              <button v-for="p in priorities" :key="p.value" @click="addPriority = p.value" class="flex-1 py-2 rounded-lg border transition" :class="addPriority === p.value ? `bg-${p.color}/20 border-${p.color} text-${p.color}` : 'border-[#99907c] text-[#d0c5af]'">{{ p.label }}</button>
            </div>
          </div>
          <div v-if="addType === 'issues' || addType === 'blockers'">
            <label class="block text-sm text-[#d0c5af] mb-1">严重程度</label>
            <div class="flex gap-2">
              <button v-for="s in severities" :key="s.value" @click="addSeverity = s.value" class="flex-1 py-2 rounded-lg border transition" :class="addSeverity === s.value ? `bg-${s.color}/20 border-${s.color} text-${s.color}` : 'border-[#99907c] text-[#d0c5af]'">{{ s.label }}</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showAddModal = false" class="flex-1 py-2 border border-[#99907c] text-[#d0c5af] rounded-lg hover:border-[#f2ca50] transition">取消</button>
          <button @click="submitAdd" class="flex-1 py-2 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { DayData, Item, Priority, Severity } from './types'

const currentDate = ref(new Date().toISOString().split('T')[0])
const showHistory = ref(false)
const showAddModal = ref(false)
const addType = ref('')
const addTitle = ref('')
const addPriority = ref<Priority>('mid')
const addSeverity = ref<Severity>('mid')
const dates = ref<string[]>([])

const data = reactive<DayData>({ date: '', todos: [], completed: [], issues: [], blockers: [] })

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

function loadDate(date: string) {
  currentDate.value = date
  const saved = localStorage.getItem(date)
  if (saved) {
    Object.assign(data, JSON.parse(saved))
  } else {
    data.date = date
    data.todos = []
    data.completed = []
    data.issues = []
    data.blockers = []
  }
}

function saveData() {
  localStorage.setItem(currentDate.value, JSON.stringify(data))
}

function selectDate(date: string) { loadDate(date) }

function openAddModal(type: string) {
  addType.value = type
  addTitle.value = ''
  showAddModal.value = true
}

function submitAdd() {
  if (!addTitle.value.trim()) return
  const item: Item = {
    id: crypto.randomUUID(),
    title: addTitle.value,
    priority: addType.value === 'todos' ? addPriority.value : undefined,
    severity: (addType.value === 'issues' || addType.value === 'blockers') ? addSeverity.value : undefined,
    createdAt: new Date().toISOString()
  }
  if (addType.value === 'todos') data.todos.push(item)
  else if (addType.value === 'completed') data.completed.push(item)
  else if (addType.value === 'issues') data.issues.push(item)
  else if (addType.value === 'blockers') data.blockers.push(item)
  saveData()
  showAddModal.value = false
  addTitle.value = ''
}

function toggleComplete(id: string) {
  const idx = data.todos.findIndex(i => i.id === id)
  if (idx > -1) {
    const item = data.todos.splice(idx, 1)[0]
    item.completedAt = new Date().toISOString()
    data.completed.unshift(item)
    saveData()
  }
}

function deleteItem(type: string, id: string) {
  if (type === 'todos') data.todos = data.todos.filter(i => i.id !== id)
  else if (type === 'completed') data.completed = data.completed.filter(i => i.id !== id)
  else if (type === 'issues') data.issues = data.issues.filter(i => i.id !== id)
  else if (type === 'blockers') data.blockers = data.blockers.filter(i => i.id !== id)
  saveData()
}

function bulkDelete() {
  data.todos = []
  data.completed = []
  data.issues = []
  data.blockers = []
  saveData()
}

function generateSummary() {
  const date = currentDate.value
  let text = `${date} Daily Summary\n${'='.repeat(20)}\n\n`
  if (data.todos.length) {
    text += `【待办事项】\n`
    data.todos.forEach(i => text += `- [${i.priority === 'high' ? '高' : i.priority === 'mid' ? '中' : '低'}] ${i.title}\n`)
    text += '\n'
  }
  if (data.completed.length) {
    text += `【已完成事项】\n`
    data.completed.forEach(i => text += `- [完成 ${i.completedAt?.split('T')[1]?.slice(0, 5)}] ${i.title}\n`)
    text += '\n'
  }
  if (data.issues.length) {
    text += `【发现问题】\n`
    data.issues.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
    text += '\n'
  }
  if (data.blockers.length) {
    text += `【无法解决的问题】\n`
    data.blockers.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
  }
  window.electronAPI.clipboardWrite(text)
}

function minimize() { window.electronAPI?.minimize() }
function maximize() { window.electronAPI?.maximize() }
function close() { window.electronAPI?.close() }

onMounted(() => {
  loadDate(currentDate.value)
  const keys = Object.keys(localStorage)
  dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;700;800&family=Inter:wght@300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

.font-['Manrope'] { font-family: 'Manrope', sans-serif; }
.font-['Inter'] { font-family: 'Inter', sans-serif; }

:root {
  --priorityHigh: #ffb4ab;
  --priorityMid: #ffb84d;
  --priorityLow: #4ade80;
  --severityHigh: #ffb4ab;
  --severityMid: #ffb84d;
  --severityLow: #ffe066;
}

.bg-priorityHigh\/20 { background: rgba(255, 180, 171, 0.2); }
.bg-priorityMid\/20 { background: rgba(255, 184, 77, 0.2); }
.bg-priorityLow\/20 { background: rgba(74, 222, 128, 0.2); }
.text-priorityHigh { color: #ffb4ab; }
.text-priorityMid { color: #ffb84d; }
.text-priorityLow { color: #4ade80; }

.bg-severityHigh\/20 { background: rgba(255, 180, 171, 0.2); }
.bg-severityMid\/20 { background: rgba(255, 184, 77, 0.2); }
.bg-severityLow\/20 { background: rgba(255, 224, 102, 0.2); }
.text-severityHigh { color: #ffb4ab; }
.text-severityMid { color: #ffb84d; }
.text-severityLow { color: #ffe066; }

.border-\[0\.5px_rgba\(153\,144\,124\,0\.2\)\] { border: 0.5px solid rgba(153, 144, 124, 0.2); }
</style>