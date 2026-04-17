<script setup lang="ts">
import { onMounted } from 'vue'
import { useChat } from '../composables/useChat'

const { messages, input, loading, modelStatus, checkModel, send } = useChat()

onMounted(() => {
  checkModel()
})
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col">
    <div class="mb-6">
      <h1 class="text-4xl font-extrabold font-Manrope tracking-tighter text-[#e5e2e1] mb-2">
        AI Chat
      </h1>
      <p class="text-[#d0c5af]">
        <span v-if="modelStatus === 'checking'">Checking model...</span>
        <span v-else-if="modelStatus === 'ready'" class="text-[#4ade80]">Model ready</span>
        <span v-else-if="modelStatus === 'not-installed'" class="text-[#ffb4ab]">
          Ollama not found. Install from ollama.com
        </span>
      </p>
    </div>
    
    <div class="flex-1 flex flex-col">
      <div class="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-[#201f1f] rounded-xl">
        <div v-for="(msg, index) in messages" :key="index" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
          <div class="max-w-[80%] p-3 rounded-lg" :class="msg.role === 'user' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#2a2a2a] text-[#e5e2e1]'">
            <div class="text-sm whitespace-pre-wrap">{{ msg.content }}</div>
          </div>
        </div>
        <div v-if="loading" class="flex justify-start">
          <div class="bg-[#2a2a2a] p-3 rounded-lg">
            <span class="material-symbols-outlined animate-spin text-[#f2ca50]">sync</span>
          </div>
        </div>
      </div>
      
      <div class="flex gap-2">
        <input
          v-model="input"
          @keyup.enter="send"
          placeholder="Type your message..."
          class="flex-1 bg-[#2a2a2a] text-[#e5e2e1] px-4 py-3 rounded-lg border border-[#99907c]/30 focus:border-[#f2ca50] outline-none"
          :disabled="loading"
        />
        <button
          @click="send"
          :disabled="loading || !input.trim()"
          class="px-6 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition"
          :class="{ 'opacity-50': loading || !input.trim() }"
        >
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  </div>
</template>