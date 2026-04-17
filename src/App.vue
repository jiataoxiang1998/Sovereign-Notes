<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import DashboardView from './views/DashboardView.vue'
import HistoryView from './views/HistoryView.vue'
import ChatView from './views/ChatView.vue'

const currentView = ref('dashboard')

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'dashboard': return DashboardView
    case 'history': return HistoryView
    case 'chat': return ChatView
    default: return DashboardView
  }
})

onMounted(() => {
  console.log('App mounted')
})
</script>

<template>
  <div class="h-screen flex bg-[#131313] text-[#e5e2e1] font-['Inter']">
    <Sidebar :currentView="currentView" @change="currentView = $event" />
    
    <main class="flex-1 flex flex-col overflow-hidden">
      <Header />
      
      <div class="flex-1 overflow-y-auto">
        <component :is="currentComponent" />
      </div>
    </main>
  </div>
</template>