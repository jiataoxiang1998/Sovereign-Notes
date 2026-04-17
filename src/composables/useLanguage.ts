import { ref, computed } from 'vue'

export type Language = 'en' | 'zh'

const currentLanguage = ref<Language>(localStorage.getItem('language') as Language || 'en')

export function useLanguage() {
  const isZh = computed(() => currentLanguage.value === 'zh')
  
  function toggle() {
    currentLanguage.value = currentLanguage.value === 'en' ? 'zh' : 'en'
    localStorage.setItem('language', currentLanguage.value)
  }
  
  function t(key: Record<Language, string>): string {
    return key[currentLanguage.value]
  }
  
  return {
    currentLanguage,
    isZh,
    toggle,
    t
  }
}