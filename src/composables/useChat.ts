import { ref } from 'vue'
import { useLanguage } from './useLanguage'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const { currentLanguage } = useLanguage()
  
  const messages = ref<ChatMessage[]>([])
  const input = ref('')
  const loading = ref(false)
  const modelStatus = ref<'checking' | 'ready' | 'not-installed' | ''>('')
  
  async function checkModel() {
    modelStatus.value = 'checking'
    try {
      const res = await fetch('http://localhost:11434/api/tags', { method: 'GET' })
      modelStatus.value = res.ok ? 'ready' : 'not-installed'
    } catch {
      modelStatus.value = 'not-installed'
    }
  }
  
  function send() {
    if (!input.value.trim() || loading.value) return
    
    const isZh = currentLanguage.value === 'zh'
    
    if (modelStatus.value !== 'ready') {
      messages.value.push({
        role: 'assistant',
        content: isZh
          ? '请先安装 Ollama 并下载模型。\n1. 安装: https://ollama.com\n2. 运行: ollama pull qwen2.5\n3. 重启应用'
          : 'Please install Ollama first.\n1. Install: https://ollama.com\n2. Run: ollama pull qwen2.5\n3. Restart the app'
      })
      return
    }
    
    const userMessage = input.value.trim()
    messages.value.push({ role: 'user', content: userMessage })
    input.value = ''
    loading.value = true
    
    const chatMessages = [
      { role: 'system', content: isZh ? '你是 AI 助手,请简洁回答。' : 'You are a helpful assistant.' },
      ...messages.value.map(m => ({ role: m.role, content: m.content }))
    ]
    
    fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'qwen2.5', messages: chatMessages, stream: false })
    })
      .then(res => {
        if (!res.ok) throw new Error('Ollama error')
        return res.json()
      })
      .then(data => {
        const reply = data.message?.content || (isZh ? '无法生成回复' : 'Could not generate')
        messages.value.push({ role: 'assistant', content: reply })
      })
      .catch((error: any) => {
        messages.value.push({ role: 'assistant', content: isZh ? `错误: ${error.message}` : `Error: ${error.message}` })
      })
      .finally(() => {
        loading.value = false
      })
  }
  
  function clear() {
    messages.value = []
  }
  
  return {
    messages,
    input,
    loading,
    modelStatus,
    checkModel,
    send,
    clear
  }
}