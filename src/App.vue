<template>
  <div class="h-screen flex bg-[#131313] text-[#e5e2e1] font-['Inter']">
    <!-- SideNavBar -->
    <aside class="bg-[#0E0E0E] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-50">
      <div class="px-8 mb-12 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#f2ca50] to-[#b8860b] flex items-center justify-center shadow-lg shadow-[#f2ca50]/20">
          <svg class="w-5 h-5 text-[#1a1a1a]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-xl font-bold uppercase tracking-widest text-[#D4AF37] font-['Manrope']">Sovereign</h1>
          <p class="text-[10px] text-[#d0c5af] uppercase tracking-widest mt-1 opacity-60 font-['Manrope']">Work Summary</p>
        </div>
      </div>
      <nav class="flex-1 space-y-2">
        <a @click="currentView = 'dashboard'" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer" :class="{'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === 'dashboard'}">
          <span class="material-symbols-outlined">dashboard</span>
          <span>{{ t('nav.dashboard') }}</span>
        </a>
        <a @click="currentView = 'history'" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer" :class="{'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === 'history'}">
          <span class="material-symbols-outlined">history</span>
          <span>{{ t('nav.history') }}</span>
        </a>
        <a @click="currentView = 'chat'" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer" :class="{'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === 'chat'}">
          <span class="material-symbols-outlined">chat</span>
          <span>{{ t('nav.chat') }}</span>
        </a>
      </nav>
      <div class="px-4 pb-4 space-y-2">
        <button @click="copyFromLast" class="w-full py-2 border border-[#99907c]/30 text-[#d0c5af] text-xs font-bold rounded-lg flex items-center justify-center gap-2 hover:border-[#f2ca50] hover:text-[#f2ca50] transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          {{ currentLanguage === 'en' ? 'Copy from Last' : '从上次复制' }}
        </button>
      </div>
    </aside>

    <!-- Main Workspace -->
    <main class="pl-64 h-screen flex flex-col w-full">
      <!-- TopNavBar -->
      <header class="h-12 w-full fixed top-0 z-40 bg-[#131313] flex justify-between items-center px-8 font-['Manrope'] font-light border-b border-[#f2ca50]/10" style="-webkit-app-region: drag; position: relative;">
        <div class="flex items-center" style="-webkit-app-region: no-drag;">
          <span class="text-[#d0c5af] text-xs tracking-widest uppercase opacity-60">Sovereign Notes</span>
        </div>
        <div class="flex items-center gap-3" style="-webkit-app-region: no-drag;">
          <button @click="toggleLanguage" class="text-xs px-2 py-1 rounded bg-[#2a2a2a] text-[#d0c5af] hover:bg-[#3a3939] transition border border-[#99907c]/30">
            {{ t('lang.toggle') }}
          </button>
          <button @click="minimize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="Minimize">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
          </button>
          <button @click="maximize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="Maximize">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5 5m11 1l-5-5m-4 0h4m-4 0l-5-5"/></svg>
          </button>
          <button @click="close" class="w-10 h-8 flex items-center justify-center hover:bg-[#93000a] rounded transition" title="{{ t('nav.close') }}">
            <svg class="w-4 h-4 text-[#d0c5af] hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </header>

      <!-- Content Canvas -->
      <div class="mt-12 p-8 flex-1 bg-[#0e0e0e] overflow-y-auto">
<!-- Dashboard View -->
        <template v-if="currentView === 'dashboard'">
          <DashboardView
            :data="data"
            :is-read-only="isReadOnly"
            :current-language="currentLanguage"
            :categories="categories"
            :current-date="currentDate"
            :copy-success="copySuccess"
            :todo-categories="todoCategories"
            :uncategorized-todos="uncategorizedTodos"
            :completed-categories="completedCategories"
            :uncategorized-completed="uncategorizedCompleted"
            :issue-categories="issueCategories"
            :uncategorized-issues="uncategorizedIssues"
            :collapsed-categories="collapsedCategories"
            :due-date-picker-id="dueDatePickerId"
            :category-picker-id="categoryPickerId"
            :picker-year="pickerYear"
            :picker-month="pickerMonth"
            :picker-days="pickerDays"
            :editing-id="editingId"
            :editing-title="editingTitle"
            :dragged-item="draggedItem"
            :drag-over-index="dragOverIndex"
            @open-add-modal="openAddModal"
            @open-add-modal-with-category="openAddModalWithCategory"
            @toggle-category-collapse="toggleCategoryCollapse"
            @toggle-complete="toggleComplete"
            @move-to-todo="moveToTodo"
            @mark-issue-complete="markIssueComplete"
            @toggle-priority="togglePriority"
            @toggle-severity="toggleSeverity"
            @start-edit="startEdit"
            @save-edit="saveEdit"
            @delete-item="deleteItem"
            @init-picker="initPicker"
            @change-picker-month="changePickerMonth"
            @confirm-due-date="confirmDueDate"
            @open-summary-modal="openSummaryModal"
            @show-category-modal="showCategoryModal = true"
            @update-editing-title="updateEditingTitle"
            @on-drag-start="onDragStart"
            @on-drag-over="onDragOver"
            @on-drop="onDrop"
            @on-drag-end="onDragEnd"
            @set-category-picker="categoryPickerId = $event"
            @set-due-date-picker="dueDatePickerId = $event"
          />
        </template>

        <!-- History View -->
        <template v-if="currentView === 'history'">
          <HistoryView
            :current-language="currentLanguage"
            :copy-success="copySuccess"
            :dates="dates"
            :filtered-dates="filteredDates"
            :timeframe="timeframe"
            :calendar-days="calendarDays"
            :display-month="displayMonth"
            :current-date="currentDate"
            :categories="categories"
            :item-counts="itemCounts"
            @set-timeframe="timeframe = $event"
            @change-month="changeMonth"
            @show-history-modal="showHistoryModal"
            @copy-history-summary-by-date="copyHistorySummaryByDate"
            @show-import-help="showImportHelp = true"
            @show-category-modal="showCategoryModal = true"
            @export-data="exportData"
            @import-data="importData"
          />
        </template>

        <!-- Chat View -->
        <template v-if="currentView === 'chat'">
          <div class="h-[calc(100vh-8rem)] flex flex-col">
            <div class="mb-6">
              <h1 class="text-4xl font-extrabold font-Manrope tracking-tighter text-[#e5e2e1] mb-2">
                AI Chat
              </h1>
              <p class="text-[#d0c5af]">
                <span v-if="chatModelStatus === 'checking'">Checking model...</span>
                <span v-else-if="chatModelStatus === 'ready'" class="text-[#4ade80]">Model ready</span>
                <span v-else-if="chatModelStatus === 'not-installed'" class="text-[#ffb4ab]">
                  Ollama not found. Install from ollama.com
                </span>
              </p>
            </div>
            
            <div class="flex-1 flex flex-col">
              <div class="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-[#201f1f] rounded-xl">
                <div v-for="(msg, index) in chatMessages" :key="index" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
                  <div class="max-w-[80%] p-3 rounded-lg" :class="msg.role === 'user' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'bg-[#2a2a2a] text-[#e5e2e1]'">
                    <div class="text-sm whitespace-pre-wrap">{{ msg.content }}</div>
                  </div>
                </div>
                <div v-if="chatLoading" class="flex justify-start">
                  <div class="bg-[#2a2a2a] p-3 rounded-lg">
                    <span class="material-symbols-outlined animate-spin text-[#f2ca50]">sync</span>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-2">
                <input
                  v-model="chatInput"
                  @keyup.enter="sendChatMessage"
                  placeholder="Type your message..."
                  class="flex-1 bg-[#2a2a2a] text-[#e5e2e1] px-4 py-3 rounded-lg border border-[#99907c]/30 focus:border-[#f2ca50] outline-none"
                  :disabled="chatLoading"
                />
                <button
                  @click="sendChatMessage"
                  :disabled="chatLoading || !chatInput.trim()"
                  class="px-6 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition"
                  :class="{ 'opacity-50': chatLoading || !chatInput.trim() }"
                >
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showAddModal = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-6 w-96">
        <h3 class="text-lg font-bold mb-4 text-[#f2ca50] font-['Manrope']">
          {{ addType === 'todos' ? t('modal.add.todo') : addType === 'completed' ? t('modal.add.completed') : addType === 'issues' ? t('modal.add.issue') : t('modal.add.blocker') }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-[#d0c5af] mb-1">{{ t('modal.title') }}</label>
            <input v-model="addTitle" type="text" class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-[#f2ca50]" :placeholder="t('modal.title.placeholder')" @keyup.enter="submitAdd"/>
          </div>
          <div v-if="addType === 'todos'">
            <label class="block text-sm text-[#d0c5af] mb-1">{{ t('modal.priority') }}</label>
            <div class="flex gap-2">
              <button @click="addPriority = 'high'" class="flex-1 py-2 rounded-lg border transition" :class="addPriority === 'high' ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]' : 'border-[#99907c] text-[#d0c5af]'">高</button><button @click="addPriority = 'mid'" class="flex-1 py-2 rounded-lg border transition" :class="addPriority === 'mid' ? 'bg-[#ffb84d]/20 border-[#ffb84d] text-[#ffb84d]' : 'border-[#99907c] text-[#d0c5af]'">中</button><button @click="addPriority = 'low'" class="flex-1 py-2 rounded-lg border transition" :class="addPriority === 'low' ? 'bg-[#4ade80]/20 border-[#4ade80] text-[#4ade80]' : 'border-[#99907c] text-[#d0c5af]'">低</button>
            </div>
          </div>
          <div v-if="addType === 'todos'" class="relative">
            <label class="block text-sm text-[#d0c5af] mb-1">{{ t('modal.dueDate') }}</label>
            <button @click="toggleAddPicker" class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border border-[#f2ca50]/30 text-left hover:border-[#f2ca50] transition">
              {{ addDueDate || 'Click to select date...' }}
            </button>
            <div v-if="showAddPicker" class="absolute top-full left-0 mt-1 z-50 bg-[#201f1f] border border-[#f2ca50] rounded-lg p-2 min-w-[200px]" @click.stop>
              <div class="flex justify-between items-center mb-2">
                <button @click.stop="changeAddPickerMonth(-1)" class="text-[#d0c5af] hover:text-[#f2ca50] font-bold">‹</button>
                <span class="text-xs text-[#f2ca50]">{{ addPickerYear }} {{ addPickerMonth }}</span>
                <button @click.stop="changeAddPickerMonth(1)" class="text-[#d0c5af] hover:text-[#f2ca50] font-bold">›</button>
              </div>
              <div class="grid grid-cols-7 gap-1 mb-1">
                <span v-for="w in t('modal.weekdays').split(',')" :key="w" class="text-[9px] text-[#99907c] text-center">{{ w }}</span>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <button v-for="d in addPickerDays" :key="d.date" @click.stop="addDueDate = d.date; showAddPicker = false" :disabled="!d.valid" class="text-xs py-1 rounded transition" :class="[d.valid ? 'text-[#e5e2e1] hover:bg-[#3a3939]' : 'text-[#99907c]/30', d.isCurrent ? 'bg-[#f2ca50] text-[#3c2f00]' : '']">{{ d.day }}</button>
              </div>
              <button @click.stop="addDueDate = ''" class="mt-2 w-full text-xs text-[#ffb4ab] hover:bg-[#93000a]/20 py-1 rounded">{{ t('modal.clear') }}</button>
              <button @click.stop="showAddPicker = false" class="mt-1 w-full text-xs text-[#d0c5af] hover:bg-[#3a3939] py-1 rounded">{{ t('modal.close') }}</button>
            </div>
          </div>
          <div v-if="addType === 'todos' || addType === 'completed' || addType === 'issues'">
            <label class="block text-sm text-[#d0c5af] mb-1">{{ t('modal.category') }}</label>
            <select v-model="addCategoryId" class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border border-[#99907c]/30 focus:border-[#f2ca50] outline-none">
              <option value="">{{ t('modal.noCategory') }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div v-if="addType === 'issues'">
            <label class="block text-sm text-[#d0c5af] mb-1">{{ t('modal.severity') }}</label>
            <div class="flex gap-2">
              <button @click="addSeverity = 'high'" class="flex-1 py-2 rounded-lg border transition" :class="addSeverity === 'high' ? 'bg-[#ffb4ab]/20 border-[#ffb4ab] text-[#ffb4ab]' : 'border-[#99907c] text-[#d0c5af]'">严重</button><button @click="addSeverity = 'mid'" class="flex-1 py-2 rounded-lg border transition" :class="addSeverity === 'mid' ? 'bg-[#ffb84d]/20 border-[#ffb84d] text-[#ffb84d]' : 'border-[#99907c] text-[#d0c5af]'">一般</button><button @click="addSeverity = 'low'" class="flex-1 py-2 rounded-lg border transition" :class="addSeverity === 'low' ? 'bg-[#ffe066]/20 border-[#ffe066] text-[#ffe066]' : 'border-[#99907c] text-[#d0c5af]'">轻微</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showAddModal = false" class="flex-1 py-2 border border-[#99907c] text-[#d0c5af] rounded-lg hover:border-[#f2ca50] transition">{{ t('modal.cancel') }}</button>
          <button @click="submitAdd" class="flex-1 py-2 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition">{{ currentLanguage === 'en' ? 'Add' : '添加' }}</button>
        </div>
      </div>
    </div>

    <!-- History Detail Modal -->
    <div v-if="showHistoryModalFlag && historyModalData" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showHistoryModalFlag = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-[#f2ca50] font-bold">{{ formatDateFull(historyModalData.date) }}</span>
            <h3 class="text-2xl font-bold font-['Manrope'] mt-1">{{ t('dashboard.title') }}{{ currentLanguage === 'en' ? ' (Read-only)' : '（只读）' }}</h3>
          </div>
          <button @click="showHistoryModalFlag = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>

        <div class="mb-6">
          <button @click="showHistorySummaryTab = 'detail'" :class="showHistorySummaryTab === 'detail' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-l-lg text-sm font-bold transition-colors">{{ currentLanguage === 'en' ? 'Detail' : '详情' }}</button>
          <button @click="showHistorySummaryTab = 'text'" :class="showHistorySummaryTab === 'text' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-r-lg text-sm font-bold transition-colors">{{ currentLanguage === 'en' ? 'Summary' : '摘要' }}</button>
        </div>

        <!-- Detail View -->
        <div v-if="showHistorySummaryTab === 'detail'" class="space-y-6">
          <div v-if="historyModalData.todos?.length">
            <h4 class="text-sm font-bold text-[#f2ca50] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'To-do' : '待办' }}</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.todos" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full" :class="{
                  'bg-[#ffb4ab]': item.priority === 'high',
                  'bg-[#ffb84d]': item.priority === 'mid',
                  'bg-[#4ade80]': item.priority === 'low'
                }"></span>
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="historyModalData.completed?.length">
            <h4 class="text-sm font-bold text-[#4ade80] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Completed' : '已完成' }}</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.completed" :key="item.id" class="p-3 rounded bg-[#1c1b1b]/40 border-l-2 border-[#4ade80] flex items-center gap-3">
                <span class="material-symbols-outlined text-[#4ade80] text-sm">check_circle</span>
                <span class="text-[#d0c5af] line-through">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="historyModalData.issues?.length">
            <h4 class="text-sm font-bold text-[#ffe066] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Identified Issues' : '发现问题' }}</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.issues" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center justify-between">
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
                <span class="text-xs px-2 py-0.5 rounded" :class="{
                  'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                  'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                  'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                }">{{ item.severity === 'high' ? 'High' : item.severity === 'mid' ? 'Mid' : 'Low' }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="historyModalData.blockers?.length">
            <h4 class="text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Blockers' : '阻塞问题' }}</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.blockers" :key="item.id" class="p-3 rounded bg-[#93000a]/20 border-l-4 border-[#ffb4ab]">
                <span class="text-[#ffdad6] font-bold">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Text View -->
        <div v-if="showHistorySummaryTab === 'text'" class="bg-[#2a2a2a] rounded-lg p-4">
          <pre class="text-sm text-[#e5e2e1] whitespace-pre-wrap font-mono">{{ generateSummaryText(historyModalData.date, historyModalData) }}</pre>
        </div>
        
        <div class="flex justify-end mt-8 gap-4">
          <div v-if="copySuccess" class="flex items-center gap-2 text-[#4ade80]">
            <span class="material-symbols-outlined text-sm">check_circle</span>
            <span class="text-sm">Copied</span>
          </div>
          <button @click="copyHistorySummary(historyModalData)" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">content_copy</span>
            {{ currentLanguage === 'en' ? 'Copy Summary' : '复制摘要' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Import Help Modal -->
    <div v-if="showImportHelp" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showImportHelp = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold font-['Manrope'] text-[#f2ca50]">{{ currentLanguage === 'en' ? 'Import Help' : '导入帮助' }}</h3>
          </div>
          <button @click="showImportHelp = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>
        
        <div class="space-y-6 text-[#d0c5af]">
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📤 {{ currentLanguage === 'en' ? 'Export Data' : '导出数据' }}</h4>
            <p class="text-sm">{{ currentLanguage === 'en' ? 'Click "Export Data" button to download all history as JSON file.' : '点击"导出数据"按钮将所有历史记录下载为 JSON 文件。' }}</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📥 {{ currentLanguage === 'en' ? 'Import Data' : '导入数据' }}</h4>
            <p class="text-sm">{{ currentLanguage === 'en' ? 'Click "Import Data" button and select exported JSON file to import.' : '点击"导入数据"按钮并选择要导入的 JSON 文件。' }}</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">🔄 {{ currentLanguage === 'en' ? 'Sync Notes' : '同步说明' }}</h4>
            <ul class="text-sm space-y-2">
              <li>• {{ currentLanguage === 'en' ? 'Import merges data, same date will be overwritten' : '导入时会合并数据，相同日期的数据会被覆盖' }}</li>
              <li>• {{ currentLanguage === 'en' ? 'Backup current data before exporting' : '建议导出前先备份当前数据' }}</li>
              <li>• {{ currentLanguage === 'en' ? 'Can transfer data between computers via file' : '可以在不同电脑间通过文件传输同步数据' }}</li>
            </ul>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📋 {{ currentLanguage === 'en' ? 'File Format' : '文件格式' }}</h4>
            <pre class="text-xs text-[#e5e2e1] whitespace-pre-wrap font-mono mt-2">{
  "YYYY-MM-DD": {
    "date": "YYYY-MM-DD",
    "todos": [...],
    "completed": [...],
    "issues": [...],
    "blockers": [...]
  }
}</pre>
          </div>
        </div>
        
        <div class="flex justify-end mt-8">
          <button @click="showImportHelp = false" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition">{{ currentLanguage === 'en' ? 'Got it' : '知道了' }}</button>
        </div>
      </div>
    </div>

    <!-- {{ currentLanguage === 'en' ? 'Category Management' : '类别管理' }} Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showCategoryModal = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-6 w-[400px]">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-[#e5e2e1]">{{ currentLanguage === 'en' ? 'Manage Categories' : '管理类别' }}</h3>
          <button @click="showCategoryModal = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>
        
        <div class="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
          <div v-for="cat in categories" :key="cat.id" class="flex items-center gap-2 p-2 rounded bg-[#2a2a2a]/50 group">
            <template v-if="editingCategoryId === cat.id">
              <input v-model="editingCategoryName" @keyup.enter="updateCategory(cat.id, editingCategoryName)" @blur="updateCategory(cat.id, editingCategoryName)" class="flex-1 bg-[#353534] text-[#e5e2e1] px-2 py-1 rounded border border-[#f2ca50] outline-none" autofocus />
            </template>
            <template v-else>
              <span class="flex-1 text-[#e5e2e1]">{{ cat.name }}</span>
              <button @click="editingCategoryId = cat.id; editingCategoryName = cat.name" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 text-sm">edit</button>
              <button @click="deleteCategory(cat.id)" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] text-sm">delete</button>
            </template>
          </div>
        </div>
        
        <div class="flex gap-2">
          <input v-model="newCategoryName" :placeholder="currentLanguage === 'en' ? 'New category name' : '新类别名称'" class="flex-1 bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded border border-[#99907c]/30 focus:border-[#f2ca50] outline-none" @keyup.enter="addCategory(newCategoryName); newCategoryName = ''" />
          <button @click="addCategory(newCategoryName); newCategoryName = ''" class="px-4 py-2 bg-[#f2ca50] text-[#3c2f00] font-bold rounded hover:brightness-110">{{ currentLanguage === 'en' ? 'Add' : '添加' }}</button>
        </div>
      </div>
    </div>

    <!-- Import Success/Error Toast -->
    <div v-if="importSuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
      <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
      <span class="text-[#4ade80] text-sm">{{ importMessage || 'Import successful' }}</span>
    </div>
    <div v-if="importError" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#ffb4ab] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
      <span class="material-symbols-outlined text-[#ffb4ab]">error</span>
      <span class="text-[#ffb4ab] text-sm">{{ importError }}</span>
    </div>

    <!-- Summary Modal for Today -->
    <div v-if="showSummaryModalFlag" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showSummaryModalFlag = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-[#f2ca50] font-bold">{{ formatDateFull(currentDate) }}</span>
            <h3 class="text-2xl font-bold font-['Manrope'] mt-1" :class="isReadOnly ? 'text-[#99907c]' : ''">{{ currentLanguage === 'en' ? 'Daily Summary' : '每日总结' }}{{ isReadOnly ? (currentLanguage === 'en' ? ' (Read-only)' : '（只读）') : '' }}</h3>
          </div>
          <button @click="showSummaryModalFlag = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>

        <div v-if="!isReadOnly" class="mb-6">
          <button @click="showSummaryTab = 'detail'" :class="showSummaryTab === 'detail' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-l-lg text-sm font-bold transition-colors">{{ currentLanguage === 'en' ? 'Detail' : '详情' }}</button>
          <button @click="showSummaryTab = 'text'" :class="showSummaryTab === 'text' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-r-lg text-sm font-bold transition-colors">{{ currentLanguage === 'en' ? 'Summary' : '摘要' }}</button>
        </div>

        <!-- Detail View -->
        <div v-if="showSummaryTab === 'detail'" class="space-y-6">
          <div v-if="data.todos.length">
            <h4 class="text-sm font-bold text-[#f2ca50] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'To-do' : '待办' }}</h4>
            <div class="space-y-2">
              <div v-for="item in data.todos" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center gap-3">
                <span class="w-2 h-2 rounded-full" :class="{
                  'bg-[#ffb4ab]': item.priority === 'high',
                  'bg-[#ffb84d]': item.priority === 'mid',
                  'bg-[#4ade80]': item.priority === 'low'
                }"></span>
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.completed.length">
            <h4 class="text-sm font-bold text-[#4ade80] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Completed' : '已完成' }}</h4>
            <div class="space-y-2">
              <div v-for="item in data.completed" :key="item.id" class="p-3 rounded bg-[#1c1b1b]/40 border-l-2 border-[#4ade80] flex items-center gap-3">
                <span class="material-symbols-outlined text-[#4ade80] text-sm">check_circle</span>
                <span class="text-[#d0c5af] line-through">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.issues.length">
            <h4 class="text-sm font-bold text-[#ffe066] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Identified Issues' : '发现问题' }}</h4>
            <div class="space-y-2">
              <div v-for="item in data.issues" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center justify-between">
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
                <span class="text-xs px-2 py-0.5 rounded" :class="{
                  'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                  'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                  'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                }">{{ item.severity === 'high' ? 'High' : item.severity === 'mid' ? 'Mid' : 'Low' }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.blockers.length">
            <h4 class="text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-3">{{ currentLanguage === 'en' ? 'Blockers' : '阻塞问题' }}</h4>
            <div class="space-y-2">
              <div v-for="item in data.blockers" :key="item.id" class="p-3 rounded bg-[#93000a]/20 border-l-4 border-[#ffb4ab]">
                <span class="text-[#ffdad6] font-bold">{{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Text View -->
        <div v-if="showSummaryTab === 'text'" class="bg-[#2a2a2a] rounded-lg p-4">
          <pre class="text-sm text-[#e5e2e1] whitespace-pre-wrap font-mono">{{ currentSummaryText }}</pre>
        </div>
        
        <div class="flex justify-end mt-8 gap-4">
          <div v-if="copySuccess" class="flex items-center gap-2 text-[#4ade80]">
            <span class="material-symbols-outlined text-sm">check_circle</span>
            <span class="text-sm">Copied</span>
          </div>
          <button @click="copyCurrentSummary" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">content_copy</span>
            {{ currentLanguage === 'en' ? 'Copy Summary' : '复制摘要' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { DayData, Item, Priority, Severity, Category } from './types'
import DashboardView from './views/DashboardView.vue'
import HistoryView from './views/HistoryView.vue'
import { useLanguage } from './composables/useLanguage'

const { currentLanguage: currentLanguageRef, toggle: toggleLanguage, t } = useLanguage()
const currentLanguage = currentLanguageRef

const currentDate = ref(new Date().toISOString().split('T')[0])
const currentView = ref('dashboard')

const chatMessages = ref<{role: 'user' | 'assistant', content: string}[]>([])
const chatInput = ref('')
const chatLoading = ref(false)
const chatModelStatus = ref('')

const showHistory = ref(true)
const showAddModal = ref(false)
const addType = ref('')
const addTitle = ref('')
const addPriority = ref<Priority>('mid')
const addSeverity = ref<Severity>('mid')
const addDueDate = ref('')
const showAddPicker = ref(false)
const addPickerYear = ref(0)
const addPickerMonth = ref(0)
const addPickerDays = ref<{day: number, date: string, valid: boolean, isCurrent: boolean}[]>([])
const categories = ref<Category[]>([])
const editingCategoryId = ref<string | null>(null)
const editingCategoryName = ref('')
const newCategoryName = ref('')
const showCategoryModal = ref(false)
const collapsedCategories = ref<Set<string>>(new Set())
const addCategoryId = ref('')
const dates = ref<string[]>([])
const calendarDays = ref<{day: number, date: string, hasData: boolean}[]>([])
const displayMonth = ref('')
const timeframe = ref('all')

const filteredDates = computed(() => {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const [year, month] = displayMonth.value.split('-').map(Number)
  const monthStart = `${year}-${String(month).padStart(2, '0')}-01`
  const monthEnd = new Date(year, month, 0).toISOString().split('T')[0]
  
  if (timeframe.value === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return dates.value.filter(d => d >= weekAgo && d <= today)
  } else if (timeframe.value === 'month') {
    return dates.value.filter(d => d >= monthStart && d <= monthEnd)
  }
  return dates.value
})

const itemCounts = computed(() => {
  const counts: Record<string, { todos: number; completed: number }> = {}
  dates.value.forEach(date => {
    const data = localStorage.getItem(date)
    if (data) {
      const d = JSON.parse(data)
      counts[date] = { todos: d.todos?.length || 0, completed: d.completed?.length || 0 }
    }
  })
  return counts
})

const todoCategories = computed(() => {
  const grouped = new Map<string, Item[]>()
  data.todos.forEach(item => {
    if (!item.category) return
    if (!grouped.has(item.category)) grouped.set(item.category, [])
    grouped.get(item.category)!.push(item)
  })
  
  const result: {id: string, name: string, items: Item[]}[] = []
  
  categories.value.forEach(cat => {
    const items = grouped.get(cat.id) || []
    if (items.length > 0) {
      result.push({ id: cat.id, name: cat.name, items })
    }
  })
  
  return result
})

const uncategorizedTodos = computed(() => {
  return data.todos.filter(item => !item.category)
})

const completedCategories = computed(() => {
  const grouped = new Map<string, Item[]>()
  data.completed.forEach(item => {
    if (!item.category) return
    if (!grouped.has(item.category)) grouped.set(item.category, [])
    grouped.get(item.category)!.push(item)
  })
  
  const result: {id: string, name: string, items: Item[]}[] = []
  
  categories.value.forEach(cat => {
    const items = grouped.get(cat.id) || []
    if (items.length > 0) {
      result.push({ id: cat.id, name: cat.name, items })
    }
  })
  
  return result
})

const uncategorizedCompleted = computed(() => {
  return data.completed.filter(item => !item.category)
})

const issueCategories = computed(() => {
  const grouped = new Map<string, Item[]>()
  data.issues.forEach(item => {
    if (!item.category) return
    if (!grouped.has(item.category)) grouped.set(item.category, [])
    grouped.get(item.category)!.push(item)
  })
  
  const result: {id: string, name: string, items: Item[]}[] = []
  
  categories.value.forEach(cat => {
    const items = grouped.get(cat.id) || []
    if (items.length > 0) {
      result.push({ id: cat.id, name: cat.name, items })
    }
  })
  
  return result
})

const uncategorizedIssues = computed(() => {
  return data.issues.filter(item => !item.category)
})

const isReadOnly = ref(false)
const showHistoryModalFlag = ref(false)
const showImportHelp = ref(false)
const importSuccess = ref(false)
const importMessage = ref('')
const importError = ref('')
const showSummaryModalFlag = ref(false)
const showSummaryTab = ref('detail')
const showHistorySummaryTab = ref('detail')
const currentSummaryText = ref('')
const copySuccess = ref(false)
const draggedItem = ref<{type: string, item: Item} | null>(null)
const dragOverIndex = ref<{type: string, index: number} | null>(null)
const historyModalData = ref<DayData | null>(null)
const editingId = ref<string | null>(null)
const editingTitle = ref('')
const editInput = ref<HTMLInputElement | null>(null)
const dueDateItemId = ref<string | null>(null)
const dueDatePickerId = ref<string | null>(null)
const pickerYear = ref(0)
const pickerMonth = ref(0)
const pickerDays = ref<{day: number, date: string, valid: boolean, isCurrent: boolean}[]>([])
const categoryPickerId = ref<string | null>(null)

function generateSummaryText(date: string, d: DayData): string {
  const isZh = currentLanguage.value === 'zh'
  const title = isZh ? '每日总结' : 'Daily Summary'
  const todoTitle = isZh ? '待办' : 'To-do'
  const completedTitle = isZh ? '已完成' : 'Completed'
  const issuesTitle = isZh ? '发现问题' : 'Identified Issues'
  const blockersTitle = isZh ? '阻塞问题' : 'Blockers'
  const priorityH = isZh ? '高' : 'H'
  const priorityM = isZh ? '中' : 'M'
  const priorityL = isZh ? '低' : 'L'
  const severityHigh = isZh ? '高' : 'High'
  const severityMid = isZh ? '中' : 'Mid'
  const severityLow = isZh ? '低' : 'Low'
  let text = `${date} ${title}\n${'='.repeat(20)}\n\n`
  if (d.todos?.length) {
    text += `【${todoTitle}】\n`
    d.todos.forEach(i => text += `- [${i.priority === 'high' ? priorityH : i.priority === 'mid' ? priorityM : priorityL}] ${i.title}\n`)
    text += '\n'
  }
  if (d.completed?.length) {
    text += `【${completedTitle}】\n`
    d.completed.forEach(i => text += `- [Done] ${i.title}\n`)
    text += '\n'
  }
  if (d.issues?.length) {
    text += `【${issuesTitle}】\n`
    d.issues.forEach(i => text += `- [${i.severity === 'high' ? severityHigh : i.severity === 'mid' ? severityMid : severityLow}] ${i.title}\n`)
    text += '\n'
  }
  if (d.blockers?.length) {
    text += `【${blockersTitle}】\n`
    d.blockers.forEach(i => text += `- [${i.severity === 'high' ? severityHigh : i.severity === 'mid' ? severityMid : severityLow}] ${i.title}\n`)
  }
  return text
}

function openSummaryModal() {
  currentSummaryText.value = generateSummaryText(currentDate.value, data)
  showSummaryModalFlag.value = true
}

function showHistoryModal(date: string) {
  const data = localStorage.getItem(date)
  if (data) {
    historyModalData.value = JSON.parse(data)
    showHistoryModalFlag.value = true
  }
}

function copyHistorySummary(historyData: DayData) {
  const text = generateSummaryText(historyData.date, historyData)
  window.electronAPI.clipboardWrite(text)
  showCopySuccess()
}

function copyHistorySummaryByDate(date: string) {
  const saved = localStorage.getItem(date)
  if (saved) {
    const historyData = JSON.parse(saved) as DayData
    const text = generateSummaryText(historyData.date, historyData)
    window.electronAPI.clipboardWrite(text)
    showCopySuccess()
  }
}

function copyCurrentSummary() {
  window.electronAPI.clipboardWrite(currentSummaryText.value)
  showCopySuccess()
}

function showCopySuccess() {
  copySuccess.value = true
  setTimeout(() => { copySuccess.value = false }, 1000)
}

function exportData() {
  const keys = Object.keys(localStorage).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k))
  const exportObj: Record<string, DayData> = {}
  keys.forEach(k => {
    exportObj[k] = JSON.parse(localStorage.getItem(k)!)
  })
  const cats = localStorage.getItem('categories')
  const exportData = { data: exportObj, categories: cats ? JSON.parse(cats) : [] }
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `daily-summary-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importData(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target?.result as string)
      let count = 0
      if (imported.data) {
        for (const [date, dayData] of Object.entries(imported.data)) {
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            localStorage.setItem(date, JSON.stringify(dayData))
            count++
          }
        }
      } else {
        for (const [date, dayData] of Object.entries(imported)) {
          if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            localStorage.setItem(date, JSON.stringify(dayData))
            count++
          }
        }
      }
      if (imported.categories && Array.isArray(imported.categories)) {
        localStorage.setItem('categories', JSON.stringify(imported.categories))
        categories.value = imported.categories
      }
      importSuccess.value = true
      importMessage.value = `Imported ${count} days`
      setTimeout(() => { importSuccess.value = false; importMessage.value = '' }, 3000)
      const keys = Object.keys(localStorage)
      dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
      generateCalendarDays()
      if (dates.value.length > 0) {
        loadDate(dates.value[0])
      }
    } catch (err) {
      importError.value = 'Invalid file format'
      setTimeout(() => { importError.value = '' }, 3000)
    }
  }
  reader.readAsText(file)
  ;(event.target as HTMLInputElement).value = ''
}

function isHistoricalDate(date: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return date !== today
}

function changeMonth(delta: number) {
  const [y, m] = displayMonth.value.split('-').map(Number)
  const date = new Date(y, m - 1 + delta, 1)
  displayMonth.value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  generateCalendarDays()
}

function formatDateFull(dateStr: string) {
  const date = new Date(dateStr)
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
}

function getItemCount(dateStr: string) {
  const data = localStorage.getItem(dateStr)
  if (data) {
    const d = JSON.parse(data)
    return { todos: d.todos?.length || 0, completed: d.completed?.length || 0 }
  }
  return { todos: 0, completed: 0 }
}

function generateCalendarDays() {
  const [year, month] = displayMonth.value.split('-').map(Number)
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const days: {day: number, date: string, hasData: boolean}[] = []
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: 0, date: '', hasData: false })
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({ day: i, date: dateStr, hasData: dates.value.includes(dateStr) })
  }
  calendarDays.value = days
}

const data = reactive<DayData>({ date: '', todos: [], completed: [], issues: [], blockers: [] })

const priorities = computed(() => [
  { value: 'high' as Priority, label: currentLanguage.value === 'en' ? 'H' : '高', color: 'priorityHigh' },
  { value: 'mid' as Priority, label: currentLanguage.value === 'en' ? 'M' : '中', color: 'priorityMid' },
  { value: 'low' as Priority, label: currentLanguage.value === 'en' ? 'L' : '低', color: 'priorityLow' }
])

const severities = computed(() => [
  { value: 'high' as Severity, label: currentLanguage.value === 'en' ? 'High' : '高', color: 'severityHigh' },
  { value: 'mid' as Severity, label: currentLanguage.value === 'en' ? 'Mid' : '中', color: 'severityMid' },
  { value: 'low' as Severity, label: currentLanguage.value === 'en' ? 'Low' : '低', color: 'severityLow' }
])

function loadDate(date: string) {
  currentDate.value = date
  displayMonth.value = date.slice(0, 7)
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
  isReadOnly.value = date < new Date().toISOString().split('T')[0]
}

function refreshIfNewDay() {
  const today = new Date().toISOString().split('T')[0]
  if (currentDate.value !== today) {
    const todayData = localStorage.getItem(today)
    if (!todayData) {
      data.date = today
      data.todos = []
      data.completed = []
      data.issues = []
      data.blockers = []
      carryOverFromYesterday(today)
    }
    loadDate(today)
    const keys = Object.keys(localStorage)
    dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
    generateCalendarDays()
  }
}

function getLastRecordedDate(beforeDate: string): string | null {
  const keys = Object.keys(localStorage).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k))
  const sortedDates = keys.sort().reverse()
  return sortedDates.find(d => d < beforeDate) || null
}

function carryOverFromYesterday(date: string) {
  const lastDate = getLastRecordedDate(date)
  if (!lastDate) return
  const lastData = localStorage.getItem(lastDate)
  if (!lastData) return
  const last = JSON.parse(lastData)
  if (last.todos?.length) {
    last.todos.forEach((t: Item) => {
      const item: Item = { ...t, id: crypto.randomUUID(), createdAt: new Date().toISOString(), sourceType: 'todos' }
      data.todos.push(item)
    })
  }
  if (last.issues?.length) {
    last.issues.forEach((i: Item) => {
      const item: Item = { ...i, id: crypto.randomUUID(), createdAt: new Date().toISOString(), sourceType: 'issues' }
      data.issues.push(item)
    })
  }
  if (last.blockers?.length) {
    last.blockers.forEach((b: Item) => {
      const item: Item = { ...b, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      data.blockers.push(item)
    })
  }
  if (data.todos.length || data.issues.length || data.blockers.length) {
    saveData()
  }
}

function saveData() {
  localStorage.setItem(currentDate.value, JSON.stringify(data))
}

function copyFromLast() {
  const today = new Date().toISOString().split('T')[0]
  data.date = today
  data.todos = []
  data.completed = []
  data.issues = []
  data.blockers = []
  carryOverFromYesterday(today)
  loadDate(today)
}

function selectDate(date: string) { 
  loadDate(date)
}

function openAddModal(type: string) {
  if (isReadOnly.value) return
  addType.value = type
  addTitle.value = ''
  addCategoryId.value = ''
  addPriority.value = 'mid'
  addDueDate.value = ''
  showAddModal.value = true
}

function submitAdd() {
  if (!addTitle.value.trim()) return
  const item: Item = {
    id: crypto.randomUUID(),
    title: addTitle.value,
    priority: addType.value === 'todos' ? addPriority.value : undefined,
    severity: (addType.value === 'issues' || addType.value === 'blockers') ? addSeverity.value : undefined,
    createdAt: new Date().toISOString(),
    dueDate: addType.value === 'todos' && addDueDate.value ? addDueDate.value : undefined,
    category: (addType.value === 'todos' || addType.value === 'completed' || addType.value === 'issues') && addCategoryId.value ? addCategoryId.value : undefined
  }
  if (addType.value === 'todos') data.todos.push(item)
  else if (addType.value === 'completed') data.completed.push(item)
  else if (addType.value === 'issues') data.issues.push(item)
  else if (addType.value === 'blockers') data.blockers.push(item)
  saveData()
  showAddModal.value = false
  addTitle.value = ''
  addPriority.value = 'mid'
  addDueDate.value = ''
  addCategoryId.value = ''
}

function toggleComplete(id: string) {
  const idx = data.todos.findIndex(i => i.id === id)
  if (idx > -1) {
    const item = data.todos.splice(idx, 1)[0]
    item.completedAt = new Date().toISOString()
    item.sourceType = 'todos'
    data.completed.unshift(item)
    saveData()
  }
}

function moveToTodo(item: Item) {
  if (isReadOnly.value) return
  const idx = data.completed.findIndex(i => i.id === item.id)
  if (idx > -1) {
    data.completed.splice(idx, 1)
    delete item.completedAt
    const source = item.sourceType
    delete item.sourceType
    if (source === 'issues') {
      data.issues.unshift(item)
    } else {
      data.todos.unshift(item)
    }
    saveData()
  }
}

function togglePriority(item: Item) {
  if (isReadOnly.value) return
  const priorities: (Priority | undefined)[] = [undefined, 'low', 'mid', 'high']
  const idx = priorities.indexOf(item.priority)
  item.priority = priorities[(idx + 1) % priorities.length] as Priority | undefined
  saveData()
}

function toggleSeverity(item: Item) {
  if (isReadOnly.value) return
  const severities: (Severity | undefined)[] = [undefined, 'low', 'mid', 'high']
  const idx = severities.indexOf(item.severity)
  item.severity = severities[(idx + 1) % severities.length] as Severity | undefined
  saveData()
}

function markIssueComplete(item: Item) {
  if (isReadOnly.value) return
  const idx = data.issues.findIndex(i => i.id === item.id)
  if (idx > -1) {
    data.issues.splice(idx, 1)
    item.completedAt = new Date().toISOString()
    item.sourceType = 'issues'
    data.completed.unshift(item)
    saveData()
  }
}

function initPicker(item: Item) {
  const d = item.dueDate ? new Date(item.dueDate) : new Date()
  pickerYear.value = d.getFullYear()
  pickerMonth.value = d.getMonth() + 1
  updatePickerDays(item.dueDate)
}

function updatePickerDays(currentDue?: string) {
  const firstDay = new Date(pickerYear.value, pickerMonth.value - 1, 1).getDay()
  const daysInMonth = new Date(pickerYear.value, pickerMonth.value, 0).getDate()
  const today = new Date().toISOString().split('T')[0]
  const days: {day: number, date: string, valid: boolean, isCurrent: boolean}[] = []
  for (let i = 0; i < firstDay; i++) days.push({day: 0, date: '', valid: false, isCurrent: false})
  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${pickerYear.value}-${String(pickerMonth.value).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({day: i, date, valid: true, isCurrent: date === currentDue})
  }
  pickerDays.value = days
}

function changePickerMonth(delta: number) {
  pickerMonth.value += delta
  if (pickerMonth.value > 12) { pickerMonth.value = 1; pickerYear.value++ }
  if (pickerMonth.value < 1) { pickerMonth.value = 12; pickerYear.value-- }
  updatePickerDays()
}

function confirmDueDate(item: Item, date: string) {
  item.dueDate = date
  saveData()
  dueDatePickerId.value = null
}

function toggleAddPicker() {
  showAddPicker.value = !showAddPicker.value
  if (showAddPicker.value) {
    const d = addDueDate.value ? new Date(addDueDate.value) : new Date()
    addPickerYear.value = d.getFullYear()
    addPickerMonth.value = d.getMonth() + 1
    updateAddPickerDays()
  }
}

function updateAddPickerDays() {
  const firstDay = new Date(addPickerYear.value, addPickerMonth.value - 1, 1).getDay()
  const daysInMonth = new Date(addPickerYear.value, addPickerMonth.value, 0).getDate()
  const days: {day: number, date: string, valid: boolean, isCurrent: boolean}[] = []
  for (let i = 0; i < firstDay; i++) days.push({day: 0, date: '', valid: false, isCurrent: false})
  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${addPickerYear.value}-${String(addPickerMonth.value).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({day: i, date, valid: true, isCurrent: date === addDueDate.value})
  }
  addPickerDays.value = days
}

function changeAddPickerMonth(delta: number) {
  addPickerMonth.value += delta
  if (addPickerMonth.value > 12) { addPickerMonth.value = 1; addPickerYear.value++ }
  if (addPickerMonth.value < 1) { addPickerMonth.value = 12; addPickerYear.value-- }
  updateAddPickerDays()
}

function setDueDate(item: Item) {
  const input = document.querySelector('input[type="date"]') as HTMLInputElement
  if (input?.value) {
    item.dueDate = input.value
    saveData()
  }
  dueDateItemId.value = null
}

function deleteItem(type: string, id: string) {
  if (type === 'todos') data.todos = data.todos.filter(i => i.id !== id)
  else if (type === 'completed') data.completed = data.completed.filter(i => i.id !== id)
  else if (type === 'issues') data.issues = data.issues.filter(i => i.id !== id)
  else if (type === 'blockers') data.blockers = data.blockers.filter(i => i.id !== id)
  saveData()
}

function startEdit(item: Item) {
  if (isReadOnly.value) return
  editingId.value = item.id
  editingTitle.value = item.title
}

function saveEdit(id: string) {
  if (!editingTitle.value.trim()) {
    editingId.value = null
    return
  }
  const item = data.todos.find(i => i.id === id) || data.completed.find(i => i.id === id) || data.issues.find(i => i.id === id) || data.blockers.find(i => i.id === id)
  if (item) {
    item.title = editingTitle.value.trim()
    saveData()
    editingId.value = null
  }
}

function updateEditingTitle(value: string) {
  editingTitle.value = value
}

function onDragStart(type: string, item: Item) {
  if (isReadOnly.value) return
  draggedItem.value = { type, item }
}

function onDragOver(type: string, index: number) {
  if (isReadOnly.value || !draggedItem.value) return
  dragOverIndex.value = { type, index }
}

function onDrop(type: string, index: number) {
  if (isReadOnly.value || !draggedItem.value) return
  const { type: srcType, item } = draggedItem.value
  
  let srcList: Item[]
  if (srcType === 'todos') srcList = data.todos
  else if (srcType === 'completed') srcList = data.completed
  else if (srcType === 'issues') srcList = data.issues
  else srcList = data.blockers
  
  const srcIdx = srcList.findIndex(i => i.id === item.id)
  if (srcIdx > -1) {
    srcList.splice(srcIdx, 1)
  }
  
  let dstList: Item[]
  if (type === 'todos') dstList = data.todos
  else if (type === 'completed') dstList = data.completed
  else if (type === 'issues') dstList = data.issues
  else dstList = data.blockers
  
  dstList.splice(index, 0, item)
  saveData()
  
  draggedItem.value = null
  dragOverIndex.value = null
}

function onDragEnd() {
  draggedItem.value = null
  dragOverIndex.value = null
}

function bulkDelete() {
  data.todos = []
  data.completed = []
  data.issues = []
  data.blockers = []
  saveData()
}

function generateSummary() {
  const date = currentDate.value
  const isZh = currentLanguage.value === 'zh'
  const title = isZh ? '每日总结' : 'Daily Summary'
  const todoTitle = isZh ? '待办' : 'To-do'
  const completedTitle = isZh ? '已完成' : 'Completed'
  const issuesTitle = isZh ? '发现问题' : 'Identified Issues'
  const blockersTitle = isZh ? '阻塞问题' : 'Blockers'
  const priorityH = isZh ? '高' : 'H'
  const priorityM = isZh ? '中' : 'M'
  const priorityL = isZh ? '低' : 'L'
  const severityHigh = isZh ? '高' : 'High'
  const severityMid = isZh ? '中' : 'Mid'
  const severityLow = isZh ? '低' : 'Low'
  let text = `${date} ${title}\n${'='.repeat(20)}\n\n`
  if (data.todos.length) {
    text += `【${todoTitle}】\n`
    data.todos.forEach(i => text += `- [${i.priority === 'high' ? priorityH : i.priority === 'mid' ? priorityM : priorityL}] ${i.title}\n`)
    text += '\n'
  }
  if (data.completed.length) {
    text += `【${completedTitle}】\n`
    data.completed.forEach(i => text += `- [Done ${i.completedAt?.split('T')[1]?.slice(0, 5)}] ${i.title}\n`)
    text += '\n'
  }
  if (data.issues.length) {
    text += `【${issuesTitle}】\n`
    data.issues.forEach(i => text += `- [${i.severity === 'high' ? severityHigh : i.severity === 'mid' ? severityMid : severityLow}] ${i.title}\n`)
    text += '\n'
  }
  if (data.blockers.length) {
    text += `【${blockersTitle}】\n`
    data.blockers.forEach(i => text += `- [${i.severity === 'high' ? severityHigh : i.severity === 'mid' ? severityMid : severityLow}] ${i.title}\n`)
  }
  window.electronAPI.clipboardWrite(text)
}

function minimize() { window.electronAPI?.minimize() }
function maximize() { window.electronAPI?.maximize() }
function close() { window.electronAPI?.close() }

function checkOllamaStatus() {
  chatModelStatus.value = 'checking'
  fetch('http://localhost:11434/api/tags', { method: 'GET' })
    .then(res => {
      chatModelStatus.value = res.ok ? 'ready' : 'not-installed'
    })
    .catch(() => {
      chatModelStatus.value = 'not-installed'
    })
}

function sendChatMessage() {
  if (!chatInput.value.trim() || chatLoading.value) return
  
  if (chatModelStatus.value !== 'ready') {
    chatMessages.value.push({
      role: 'assistant',
      content: currentLanguage.value === 'zh'
        ? '请先安装 Ollama 并下载模型。\n1. 安装: https://ollama.com\n2. 运行: ollama pull qwen2.5\n3. 重启应用'
        : 'Please install Ollama first.\n1. Install: https://ollama.com\n2. Run: ollama pull qwen2.5\n3. Restart the app'
    })
    return
  }
  
  const userMessage = chatInput.value.trim()
  chatMessages.value.push({ role: 'user', content: userMessage })
  chatInput.value = ''
  chatLoading.value = true
  
  const isZh = currentLanguage.value === 'zh'
  const messages = [
    { role: 'system', content: isZh ? '你是 AI 助手,请简洁回答。' : 'You are a helpful assistant.' },
    ...chatMessages.value.map(m => ({ role: m.role, content: m.content }))
  ]
  
  fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'qwen2.5', messages: messages, stream: false })
  })
    .then(res => {
      if (!res.ok) throw new Error('Ollama error')
      return res.json()
    })
    .then(data => {
      const reply = data.message?.content || (isZh ? '无法生成回复' : 'Could not generate')
      chatMessages.value.push({ role: 'assistant', content: reply })
    })
    .catch((error: any) => {
      chatMessages.value.push({ role: 'assistant', content: isZh ? `错误: ${error.message}` : `Error: ${error.message}` })
    })
    .finally(() => {
      chatLoading.value = false
    })
}



onMounted(() => {
  loadDate(currentDate.value)
  const keys = Object.keys(localStorage)
  dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
  displayMonth.value = currentDate.value.slice(0, 7)
  generateCalendarDays()
  loadCategories()
  setInterval(refreshIfNewDay, 60000)
  checkOllamaStatus()
  document.addEventListener('click', () => {
    dueDatePickerId.value = null
    categoryPickerId.value = null
  })
})

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
  editingCategoryId.value = null
}

function deleteCategory(id: string) {
  categories.value = categories.value.filter(c => c.id !== id)
  data.todos.forEach(t => { if (t.category === id) t.category = undefined })
  data.completed.forEach(t => { if (t.category === id) t.category = undefined })
  saveData()
  saveCategories()
}

function toggleCategoryCollapse(categoryId: string) {
  if (collapsedCategories.value.has(categoryId)) {
    collapsedCategories.value.delete(categoryId)
  } else {
    collapsedCategories.value.add(categoryId)
  }
}

function openAddModalWithCategory(type: string, categoryId: string) {
  openAddModal(type)
  addCategoryId.value = categoryId
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;700;800&family=Inter:wght@300;400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

.font-['Manrope'] { font-family: 'Manrope', sans-serif; }
.font-['Inter'] { font-family: 'Inter', sans-serif; }

:root {
  --priorityHigh: #ffb4ab;
  --priorityMid: #ffb84d;
  --priorityLow: #4ade80;
  --severityHigh: #ffb4ab;
  --severityMid: #ffb84d;
  --severityLow: #ffe066;
}

.bg-priorityHigh\/20 { background: rgba(255, 180, 171, 0.2); }
.bg-priorityMid\/20 { background: rgba(255, 184, 77, 0.2); }
.bg-priorityLow\/20 { background: rgba(74, 222, 128, 0.2); }
.text-priorityHigh { color: #ffb4ab; }
.text-priorityMid { color: #ffb84d; }
.text-priorityLow { color: #4ade80; }

.bg-severityHigh\/20 { background: rgba(255, 180, 171, 0.2); }
.bg-severityMid\/20 { background: rgba(255, 184, 77, 0.2); }
.bg-severityLow\/20 { background: rgba(255, 224, 102, 0.2); }
.text-severityHigh { color: #ffb4ab; }
.text-severityMid { color: #ffb84d; }
.text-severityLow { color: #ffe066; }

.border-\[0\.5px_rgba\(153\,144\,124\,0\.2\)\] { border: 0.5px solid rgba(153, 144, 124, 0.2); }
</style>