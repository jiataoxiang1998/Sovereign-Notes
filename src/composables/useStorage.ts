import { ref, watch } from 'vue'

export function useStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)
  
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  function load() {
    const stored = localStorage.getItem(key)
    if (stored) {
      data.value = JSON.parse(stored)
    }
  }
  
  function save() {
    localStorage.setItem(key, JSON.stringify(data.value))
  }
  
  function clear() {
    localStorage.removeItem(key)
    data.value = defaultValue
  }
  
  return {
    data,
    load,
    save,
    clear
  }
}

export function useDateStorage() {
  const currentDate = ref(new Date().toISOString().split('T')[0])
  const dates = ref<string[]>([])
  
  function loadDates() {
    const keys = Object.keys(localStorage)
    dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
  }
  
  function setDate(date: string) {
    currentDate.value = date
  }
  
  return {
    currentDate,
    dates,
    loadDates,
    setDate
  }
}