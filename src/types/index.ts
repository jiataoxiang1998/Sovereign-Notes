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
      startDrag: () => void
      clipboardWrite: (text: string) => Promise<boolean>
    }
  }
}