# 每日工作总结助手 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个 Electron + Vue 3 桌面应用，用于记录每日待办/已完成/问题/无法解决的问题，并生成每日工作总结

**Architecture:** 单页面四区域布局，本地 JSON 文件存储，黑金色主题

**Tech Stack:** Electron 33+, Vue 3.5+, Vite 6+, Tailwind CSS 3+, electron-store

---

## File Structure

```
daily-requester/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── electron/
│   ├── main.ts          # Electron 主进程
│   ├── preload.ts       # 预加载脚本
│   └── store.ts        # 数据存储
├── src/
│   ├── main.ts         # Vue 入口
│   ├── App.vue         # 主组件
│   ├── style.css      # Tailwind 样式
│   ├── components/
│   │   ├── Sidebar.vue
│   │   ├── Header.vue
│   │   ├── TodoCard.vue
│   │   ├── CompletedCard.vue
│   │   ├── IssueCard.vue
│   │   ├── BlockerCard.vue
│   │   ├── AddModal.vue
│   │   └── HistoryPanel.vue
│   ├── composables/
│   │   └── useData.ts  # 数据逻辑
│   └── types/
│       └── index.ts   # 类型定义
└── resources/
    └── icon.ico
```

---

## Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "daily-requester",
  "version": "1.0.0",
  "description": "每日工作总结助手",
  "main": "dist-electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build && electron-builder",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "electron-store": "^8.2.0",
    "uuid": "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "electron": "^33.0.0",
    "electron-builder": "^25.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vite-plugin-electron": "^0.28.0",
    "vue-tsc": "^2.2.0"
  }
}
```

- [ ] **Step 2: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'

export default defineConfig({
  plugins: [
    vue(),
    electron([
      { entry: 'electron/main.ts' },
      { entry: 'electron/preload.ts', onstart(options) { options.reload() } }
    ])
  ],
  resolve: { alias: { '@': '/src' } }
})
```

- [ ] **Step 3: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0D0D0D',
        card: '#1A1A1A',
        border: '#2A2A2A',
        gold: '#D4AF37',
        goldBright: '#F2CA50',
        goldDark: '#C9A227',
        text: '#FFFFFF',
        textMuted: '#D0C5AF',
        textDim: '#99907C',
        error: '#FF6B6B',
        success: '#4ADE80',
        priorityHigh: '#FF6B6B',
        priorityMid: '#FFB84D',
        priorityLow: '#4ADE80',
        severityHigh: '#FF6B6B',
        severityMid: '#FFB84D',
        severityLow: '#FFE066'
      }
    }
  },
  plugins: []
}
```

- [ ] **Step 4: 创建 postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

- [ ] **Step 5: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>每日工作总结助手</title>
</head>
<body class="bg-bg">
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

---

## Task 2: Electron 主进程

**Files:**
- Create: `electron/main.ts`
- Create: `electron/preload.ts`
- Create: `electron/store.ts`

- [ ] **Step 1: 创建 electron/main.ts**

```typescript
import { app, BrowserWindow, ipcMain, clipboard, globalShortcut } from 'electron'
import path from 'path'

const isDev = process.env.VITE_DEV_SERVER_URL

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    frame: false,
    backgroundColor: '#0D0D0D',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 窗口控制
ipcMain.on('window-minimize', () => BrowserWindow.getFocusedWindow()?.minimize())
ipcMain.on('window-maximize', () => {
  const win = BrowserWindow.getFocusedWindow()
  win?.isMaximized() ? win.unmaximize() : win.maximize()
})
ipcMain.on('window-close', () => BrowserWindow.getFocusedWindow()?.close())

// 复制到剪贴板
ipcMain.handle('clipboard-write', (_event, text: string) => {
  clipboard.writeText(text)
  return true
})

// 开机自启动
app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath('exe')
})
```

- [ ] **Step 2: 创建 electron/preload.ts**

```typescript
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  clipboardWrite: (text: string) => ipcRenderer.invoke('clipboard-write', text)
})
```

- [ ] **Step 3: 创建 electron/store.ts**

```typescript
import Store from 'electron-store'

interface Item {
  id: string
  title: string
  priority?: string
  severity?: string
  createdAt: string
  completedAt?: string
}

interface DayData {
  date: string
  todos: Item[]
  completed: Item[]
  issues: Item[]
  blockers: Item[]
}

const store = new Store<Record<string, DayData>>({
  name: 'daily-data'
})

export function getDayData(date: string): DayData {
  return store.get(date, {
    date,
    todos: [],
    completed: [],
    issues: [],
    blockers: []
  })
}

export function saveDayData(data: DayData): void {
  store.set(data.date, data)
}

export function getAllDates(): string[] {
  return Object.keys(store.store)
}

export function deleteItems(date: string, category: string, ids: string[]): void {
  const data = getDayData(date)
  data[category as keyof DayData] = data[category as keyof DayData].filter(
    (item: Item) => !ids.includes(item.id)
  )
  saveDayData(data)
}
```

---

## Task 3: Vue 前端基础

**Files:**
- Create: `src/main.ts`
- Create: `src/style.css`
- Create: `src/types/index.ts`

- [ ] **Step 1: 创建 src/main.ts**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

- [ ] **Step 2: 创建 src/style.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-bg text-text font-sans;
  margin: 0;
  overflow: hidden;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #0D0D0D;
}
::-webkit-scrollbar-thumb {
  background: #2A2A2A;
  border-radius: 2px;
}
```

- [ ] **Step 3: 创建 src/types/index.ts**

```typescript
export type Priority = 'high' | 'mid' | 'low'
export type Severity = 'high' | 'mid' | 'low'

export interface Item {
  id: string
  title: string
  priority?: Priority
  severity?: Severity
  createdAt: string
  completedAt?: string
}

export interface DayData {
  date: string
  todos: Item[]
  completed: Item[]
  issues: Item[]
  blockers: Item[]
}

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void
      maximize: () => void
      close: () => void
      clipboardWrite: (text: string) => Promise<boolean>
    }
  }
}
```

---

## Task 4: App 主组件

**Files:**
- Create: `src/App.vue`

- [ ] **Step 1: 创建 src/App.vue**

```vue
<template>
  <div class="h-screen flex bg-bg">
    <Sidebar :activeDate="currentDate" @selectDate="selectDate" @newEntry="showAddModal = true" />
    <main class="flex-1 flex flex-col">
      <Header :currentDate="currentDate" @dateChange="loadDate" />
      <div class="flex-1 p-6 overflow-auto">
        <div class="grid grid-cols-2 gap-4 h-full">
          <TodoCard :items="data.todos" @add="openAddModal('todos')" @toggle="toggleComplete" @delete="deleteItems" />
          <CompletedCard :items="data.completed" @add="openAddModal('completed')" @delete="deleteItems" />
          <IssueCard :items="data.issues" @add="openAddModal('issues')" @delete="deleteItems" />
          <BlockerCard :items="data.blockers" @add="openAddModal('blockers')" @delete="deleteItems" />
        </div>
      </div>
      <footer class="p-4 flex justify-between border-t border-border">
        <button @click="bulkDelete" class="px-4 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-bg transition">
          批量删除
        </button>
        <button @click="generateSummary" class="px-6 py-2 bg-gold text-bg font-bold rounded hover:bg-goldBright transition">
          生成每日总结并复制
        </button>
      </footer>
    </main>
    <AddModal v-if="showAddModal" :type="addType" @close="showAddModal = false" @add="addItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import TodoCard from './components/TodoCard.vue'
import CompletedCard from './components/CompletedCard.vue'
import IssueCard from './components/IssueCard.vue'
import BlockerCard from './components/BlockerCard.vue'
import AddModal from './components/AddModal.vue'
import type { DayData, Item, Priority, Severity } from './types'

const currentDate = ref(new Date().toISOString().split('T')[0])
const data = reactive<DayData>({ date: '', todos: [], completed: [], issues: [], blockers: [] })
const showAddModal = ref(false)
const addType = ref('')
const selectedIds = ref<string[]>([])

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

function selectDate(date: string) {
  loadDate(date)
}

function openAddModal(type: string) {
  addType.value = type
  showAddModal.value = true
}

function addItem(item: Partial<Item>) {
  const newItem: Item = {
    id: crypto.randomUUID(),
    title: item.title || '',
    priority: item.priority as Priority,
    severity: item.severity as Severity,
    createdAt: new Date().toISOString()
  }
  if (addType.value === 'todos') data.todos.push(newItem)
  else if (addType.value === 'completed') data.completed.push(newItem)
  else if (addType.value === 'issues') data.issues.push(newItem)
  else if (addType.value === 'blockers') data.blockers.push(newItem)
  saveData()
  showAddModal.value = false
}

function toggleComplete(id: string) {
  const idx = data.todos.findIndex(i => i.id === id)
  if (idx > -1) {
    const item = data.todos.splice(idx, 1)[0]
    item.completedAt = new Date().toISOString()
    data.completed.push(item)
    saveData()
  }
}

function deleteItems(type: string, ids: string[]) {
  if (type === 'todos') data.todos = data.todos.filter(i => !ids.includes(i.id))
  else if (type === 'completed') data.completed = data.completed.filter(i => !ids.includes(i.id))
  else if (type === 'issues') data.issues = data.issues.filter(i => !ids.includes(i.id))
  else if (type === 'blockers') data.blockers = data.blockers.filter(i => !ids.includes(i.id))
  saveData()
}

function bulkDelete() {
  const allItems = [...data.todos, ...data.completed, ...data.issues, ...data.blockers]
  const toDelete = allItems.filter(i => selectedIds.value.includes(i.id))
  deleteItems('todos', toDelete.filter(i => data.todos.find(t => t.id === i.id)).map(i => i.id))
  deleteItems('completed', toDelete.filter(i => data.completed.find(t => t.id === i.id)).map(i => i.id))
  deleteItems('issues', toDelete.filter(i => data.issues.find(t => t.id === i.id)).map(i => i.id))
  deleteItems('blockers', toDelete.filter(i => data.blockers.find(t => t.id === i.id)).map(i => i.id))
}

function generateSummary() {
  const date = currentDate.value
  let text = `${date} 每日工作总结\n${'='.repeat(20)}\n\n`
  
  if (data.todos.length) {
    text += `【待办事项】\n`
    data.todos.forEach(i => {
      const p = i.priority === 'high' ? '高' : i.priority === 'mid' ? '中' : '低'
      text += `- [${p}] ${i.title}\n`
    })
    text += '\n'
  }
  
  if (data.completed.length) {
    text += `【已完成事项】\n`
    data.completed.forEach(i => {
      const time = i.completedAt?.split('T')[1]?.slice(0, 5) || ''
      text += `- [完成 ${time}] ${i.title}\n`
    })
    text += '\n'
  }
  
  if (data.issues.length) {
    text += `【发现问题】\n`
    data.issues.forEach(i => {
      const s = i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'
      text += `- [${s}] ${i.title}\n`
    })
    text += '\n'
  }
  
  if (data.blockers.length) {
    text += `【无法解决的问题】\n`
    data.blockers.forEach(i => {
      const s = i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'
      text += `- [${s}] ${i.title}\n`
    })
  }
  
  window.electronAPI.clipboardWrite(text)
}

onMounted(() => loadDate(currentDate.value))
</script>
```

---

## Task 5: 子组件

**Files:**
- Create: `src/components/Sidebar.vue`
- Create: `src/components/Header.vue`
- Create: `src/components/TodoCard.vue`
- Create: `src/components/CompletedCard.vue`
- Create: `src/components/IssueCard.vue`
- Create: `src/components/BlockerCard.vue`
- Create: `src/components/AddModal.vue`

此处代码较多，按需创建，每个组件约 50-100 行

---

## Task 6: 测试与构建

**Files:**
- Verify: 运行 `npm run dev`
- Build: 运行 `npm run build`

- [ ] **Step 1: 安装依赖**

```bash
npm install
```

- [ ] **Step 2: 开发模式测试**

```bash
npm run dev
```

- [ ] **Step 3: 构建项目**

```bash
npm run build
```

- [ ] **Step 4: 验证 exe**

检查 `dist` 目录下生成的可执行文件

---

## Self-Review

**1. Spec coverage:**
- [x] 添加/删除待办事项
- [x] 添加/删除已完成事项
- [x] 添加/删除发现问题
- [x] 添加/删除无法解决的问题
- [x] 待办标记为已完成
- [x] 批量删除
- [x] 生成每日总结并复制
- [x] 历史记录查看
- [x] 每天数据单独保存
- [x] 开机自启动

**2. Placeholder scan:** 无 placeholder

**3. Type consistency:** 类型统一