export type Priority = 'high' | 'mid' | 'low'
export type Severity = 'high' | 'mid' | 'low'

export interface Category {
  id: string
  name: string
  color?: string
}

export interface Item {
  id: string
  title: string
  category?: string
  priority?: Priority
  severity?: Severity
  createdAt: string
  completedAt?: string
  dueDate?: string
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
      startDrag: () => void
      clipboardWrite: (text: string) => Promise<boolean>
    }
  }
}