import { ref, computed } from 'vue'
import type { Category } from '../types'

export function useCategories() {
  const categories = ref<Category[]>([])
  const editingCategoryId = ref<string | null>(null)
  const editingCategoryName = ref('')
  const newCategoryName = ref('')
  const collapsedCategories = ref<Set<string>>(new Set())

  function loadCategories() {
    const saved = localStorage.getItem('categories')
    if (saved) {
      categories.value = JSON.parse(saved)
    }
  }

  function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories.value))
  }

  function addCategory(name: string) {
    if (!name.trim()) return
    const category: Category = {
      id: crypto.randomUUID(),
      name: name.trim()
    }
    categories.value.push(category)
    saveCategories()
  }

  function updateCategory(id: string, name: string) {
    const cat = categories.value.find(c => c.id === id)
    if (cat) {
      cat.name = name.trim()
      saveCategories()
    }
  }

  function deleteCategory(id: string) {
    categories.value = categories.value.filter(c => c.id !== id)
    saveCategories()
  }

  function toggleCategoryCollapse(categoryId: string) {
    if (collapsedCategories.value.has(categoryId)) {
      collapsedCategories.value.delete(categoryId)
    } else {
      collapsedCategories.value.add(categoryId)
    }
  }

  function isCollapsed(categoryId: string) {
    return collapsedCategories.value.has(categoryId)
  }

  return {
    categories,
    editingCategoryId,
    editingCategoryName,
    newCategoryName,
    collapsedCategories,
    loadCategories,
    saveCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryCollapse,
    isCollapsed
  }
}