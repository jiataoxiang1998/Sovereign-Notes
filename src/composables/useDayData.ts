import { reactive, computed, ref } from 'vue'
import type { Priority, Severity, Item, DayData } from '../types'

const defaultData = (date: string): DayData => ({
  date,
  todos: [],
  completed: [],
  issues: [],
  blockers: []
})

export function useDayData() {
  const data = reactive<DayData>(defaultData(''))
  const currentDate = ref('')
  const isReadOnly = ref(false)
  
  function load(date: string) {
    currentDate.value = date
    const saved = localStorage.getItem(date)
    if (saved) {
      Object.assign(data, JSON.parse(saved))
    } else {
      const d = defaultData(date)
      Object.assign(data, d)
    }
    isReadOnly.value = date < new Date().toISOString().split('T')[0]
  }
  
  function save() {
    localStorage.setItem(currentDate.value, JSON.stringify(data))
  }
  
  function addItem(type: 'todos' | 'completed' | 'issues' | 'blockers', item: Partial<Item>) {
    const newItem: Item = {
      id: crypto.randomUUID(),
      title: item.title || '',
      createdAt: new Date().toISOString(),
      ...item
    }
    data[type].push(newItem)
    save()
  }
  
  function removeItem(type: 'todos' | 'completed' | 'issues' | 'blockers', id: string) {
    data[type] = data[type].filter(i => i.id !== id)
    save()
  }
  
  function toggleComplete(id: string) {
    const todo = data.todos.find(t => t.id === id)
    if (todo) {
      data.completed.push({
        ...todo,
        completedAt: new Date().toISOString(),
        sourceType: 'todos'
      })
      data.todos = data.todos.filter(t => t.id !== id)
      save()
    }
  }
  
  function generateSummary(): string {
    const date = currentDate.value
    const isZh = localStorage.getItem('language') === 'zh'
    const title = isZh ? '每日总结' : 'Daily Summary'
    
    let text = `${date} ${title}\n${'='.repeat(20)}\n\n`
    
    if (data.todos.length) {
      text += isZh ? '【待办】\n' : '【To-do】\n'
      data.todos.forEach(i => {
        const priority = i.priority === 'high' ? (isZh ? '高' : 'H') :
                         i.priority === 'mid' ? (isZh ? '中' : 'M') : (isZh ? '低' : 'L')
        text += `- [${priority}] ${i.title}\n`
      })
      text += '\n'
    }
    
    if (data.completed.length) {
      text += isZh ? '【已完成】\n' : '【Completed】\n'
      data.completed.forEach(i => {
        const time = i.completedAt?.split('T')[1]?.slice(0, 5) || ''
        text += `- [Done ${time}] ${i.title}\n`
      })
      text += '\n'
    }
    
    if (data.issues.length) {
      text += isZh ? '【发现问题】\n' : '【Identified Issues】\n'
      data.issues.forEach(i => {
        const severity = i.severity === 'high' ? (isZh ? '高' : 'High') :
                        i.severity === 'mid' ? (isZh ? '中' : 'Mid') : (isZh ? '低' : 'Low')
        text += `- [${severity}] ${i.title}\n`
      })
      text += '\n'
    }
    
    if (data.blockers.length) {
      text += isZh ? '【阻塞问题】\n' : '【Blockers】\n'
      data.blockers.forEach(i => {
        text += `- ${i.title}\n`
      })
    }
    
    return text
  }
  
  const todoCount = computed(() => data.todos.length)
  const completedCount = computed(() => data.completed.length)
  const issueCount = computed(() => data.issues.length)
  const blockerCount = computed(() => data.blockers.length)
  
  return {
    data,
    currentDate,
    isReadOnly,
    load,
    save,
    addItem,
    removeItem,
    toggleComplete,
    generateSummary,
    todoCount,
    completedCount,
    issueCount,
    blockerCount
  }
}