<template>
  <div class="h-screen flex bg-[#131313] text-[#e5e2e1] overflow-hidden font-['Inter']">
    <!-- SideNavBar -->
    <aside class="bg-[#0E0E0E] h-screen w-64 fixed left-0 top-0 flex flex-col py-8 z-50">
      <div class="px-8 mb-12">
        <h1 class="text-xl font-bold uppercase tracking-widest text-[#D4AF37] font-['Manrope']">Sovereign</h1>
        <p class="text-[10px] text-[#d0c5af] uppercase tracking-widest mt-1 opacity-60 font-['Manrope']">Work Summary</p>
      </div>
      <nav class="flex-1 space-y-2">
        <a @click="currentView = 'dashboard'" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer" :class="{'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === 'dashboard'}">
          <span class="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a @click="currentView = 'history'" class="flex items-center gap-4 py-3 hover:bg-[#201F1F] hover:text-[#F2CA50] transition-colors scale-95 duration-200 text-[#d0c5af] pl-4 font-['Manrope'] cursor-pointer" :class="{'text-[#D4AF37] font-bold border-l-2 border-[#D4AF37]': currentView === 'history'}">
          <span class="material-symbols-outlined">history</span>
          <span>History</span>
        </a>
      </nav>
    </aside>

    <!-- Main Workspace -->
    <main class="pl-64 h-screen flex flex-col w-full">
      <!-- TopNavBar -->
      <header class="h-16 w-full fixed top-0 z-40 bg-[#131313] flex justify-between items-center px-8 font-['Manrope'] font-light" style="-webkit-app-region: drag; position: relative;">
        <div></div>
        <div class="flex items-center gap-2" style="-webkit-app-region: no-drag;">
          <button @click="minimize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="最小化">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
          </button>
          <button @click="maximize" class="w-10 h-8 flex items-center justify-center hover:bg-[#2a2a2a] rounded transition" title="最大化">
            <svg class="w-4 h-4 text-[#d0c5af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5 5m11 1l-5-5m-4 0h4m-4 0l-5-5"/></svg>
          </button>
          <button @click="close" class="w-10 h-8 flex items-center justify-center hover:bg-[#93000a] rounded transition" title="关闭">
            <svg class="w-4 h-4 text-[#d0c5af] hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      </header>

      <!-- Content Canvas -->
      <div class="mt-16 p-10 overflow-y-auto flex-1 bg-[#0e0e0e]">
        <!-- Dashboard View -->
        <template v-if="currentView === 'dashboard'">
          <div v-if="copySuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
            <span class="text-[#4ade80] text-sm">复制成功</span>
          </div>
          <!-- Page Header -->
          <div class="flex justify-between items-end mb-12">
            <div>
              <h2 class="text-5xl font-extrabold font-['Manrope'] tracking-tighter text-[#e5e2e1] mb-2">
                Daily Summary
                <span v-if="isReadOnly" class="text-sm text-[#99907c] ml-2 font-normal">(只读)</span>
              </h2>
              <p class="text-[#d0c5af] font-['Inter']">Refine your daily output and generate automated work logs.</p>
            </div>
            <div class="flex gap-4">
              <button @click="openSummaryModal" class="px-8 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold shadow-[0_0_15px_rgba(242,202,80,0.1)] hover:brightness-110 transition-all flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                Generate Summary
              </button>
            </div>
          </div>

          <!-- Bento Grid Layout -->
          <div class="grid grid-cols-12 gap-6 pb-12">
            <!-- To-do Items -->
            <section class="col-span-12 lg:col-span-7 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative overflow-hidden min-h-[400px]">
              <div class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-3">
                  <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">01. 待办事项</span>
                  <h3 class="text-2xl font-bold font-['Manrope']">To-do Items</h3>
                </div>
                <button @click="!isReadOnly && openAddModal('todos')" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#f2ca50] hover:text-[#3c2f00] transition-all group">
                  <span class="material-symbols-outlined text-sm group-hover:font-bold">add</span>
                </button>
            </div>
            <div class="space-y-3">
              <div v-for="(item, index) in data.todos" :key="item.id" draggable="true" @dragstart="onDragStart('todos', item)" @dragover.prevent="onDragOver('todos', index)" @drop="onDrop('todos', index)" @dragend="onDragEnd" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'todos' && dragOverIndex?.index === index}" class="flex items-center justify-between p-4 rounded-lg bg-[#2a2a2a]/50 hover:bg-[#3a3939] group transition-all cursor-pointer">
                <div class="flex items-center gap-4">
                  <div @click="!isReadOnly && toggleComplete(item.id)" :class="isReadOnly ? 'opacity-50 cursor-not-allowed' : ''" class="w-5 h-5 rounded border-2 border-[#99907c]/50 flex items-center justify-center group-hover:border-[#f2ca50] transition-colors cursor-pointer">
                    <span class="material-symbols-outlined text-[12px] text-[#f2ca50] opacity-0 group-hover:opacity-100">check</span>
                  </div>
                  <input v-if="editingId === item.id" v-model="editingTitle" @blur="saveEdit(item.id)" @keyup.enter="saveEdit(item.id)" class="bg-[#3a3939] text-[#e5e2e1] font-medium px-2 py-1 rounded w-full outline-none border border-[#f2ca50]" autofocus ref="editInput" /><span v-else @click="startEdit(item)" class="text-[#e5e2e1] font-medium cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
                  <span v-if="item.priority" class="text-xs px-2 py-0.5 rounded" :class="{
                    'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.priority === 'high',
                    'bg-[#ffb84d]/20 text-[#ffb84d]': item.priority === 'mid',
                    'bg-[#4ade80]/20 text-[#4ade80]': item.priority === 'low'
                  }">{{ item.priority === 'high' ? '高' : item.priority === 'mid' ? '中' : '低' }}</span>
                </div>
                <button @click.stop="!isReadOnly && deleteItem('todos', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                  delete
                </button>
              </div>
              <div v-if="!data.todos.length" class="border-2 border-dashed border-[#99907c]/20 rounded-lg p-6 flex flex-col items-center justify-center text-[#d0c5af]/40 mt-4">
                <span class="material-symbols-outlined text-4xl mb-2">note_add</span>
                <p class="text-xs">Add more tasks to your workflow</p>
              </div>
            </div>
          </section>

          <!-- Completed Tasks -->
          <section class="col-span-12 lg:col-span-5 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)] relative">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">02. 已完成事项</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Completed</h3>
              </div>
              <span class="text-[10px] bg-[#f2ca50]/10 text-[#f2ca50] px-2 py-1 rounded font-bold">{{ data.completed.length }} TODAY</span>
            </div>
            <div class="space-y-2 overflow-y-auto max-h-[300px] pr-2">
              <div v-for="(item, index) in data.completed" :key="item.id" draggable="true" @dragstart="onDragStart('completed', item)" @dragover.prevent="onDragOver('completed', index)" @drop="onDrop('completed', index)" @dragend="onDragEnd" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'completed' && dragOverIndex?.index === index}" class="flex items-center gap-4 p-3 rounded-lg bg-[#1c1b1b]/40 border-l-2 border-[#f2ca50] group">
                <span class="material-symbols-outlined text-[#f2ca50] text-sm">check_circle</span>
                <input v-if="editingId === item.id" v-model="editingTitle" @blur="saveEdit(item.id)" @keyup.enter="saveEdit(item.id)" class="bg-[#3a3939] text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="startEdit(item)" class="text-sm text-[#d0c5af] line-through decoration-[#f2ca50]/40 flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
                <span class="text-xs text-[#d0c5af]">{{ item.completedAt?.split('T')[1]?.slice(0, 5) }}</span>
                <button @click.stop="!isReadOnly && deleteItem('completed', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                  delete
                </button>
              </div>
              <div v-if="!data.completed.length" class="flex items-center justify-center py-8 text-[#d0c5af]">
                No completed items
              </div>
            </div>
          </section>

          <!-- Identified Issues -->
          <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#f2ca50] font-['Manrope'] text-xs font-bold uppercase tracking-widest">03. 发现问题</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Identified Issues</h3>
              </div>
            </div>
            <div class="space-y-4">
              <div v-for="(item, index) in data.issues" :key="item.id" draggable="true" @dragstart="onDragStart('issues', item)" @dragover.prevent="onDragOver('issues', index)" @drop="onDrop('issues', index)" @dragend="onDragEnd" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'issues' && dragOverIndex?.index === index}" class="flex items-center justify-between p-3 rounded-lg bg-[#2a2a2a]/50 group">
                <input v-if="editingId === item.id" v-model="editingTitle" @blur="saveEdit(item.id)" @keyup.enter="saveEdit(item.id)" class="bg-[#3a3939] text-[#e5e2e1] flex-1 px-2 py-1 rounded outline-none border border-[#f2ca50]" autofocus /><span v-else @click="startEdit(item)" class="text-[#e5e2e1] flex-1 cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</span>
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-0.5 rounded" :class="{
                    'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                    'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                    'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                  }">{{ item.severity === 'high' ? '严重' : item.severity === 'mid' ? '一般' : '轻微' }}</span>
                  <button @click.stop="!isReadOnly && deleteItem('issues', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-[#d0c5af] opacity-0 group-hover:opacity-100 hover:text-[#ffb4ab] transition-all">
                    delete
                  </button>
                </div>
              </div>
              <button @click="!isReadOnly && openAddModal('issues')" :class="isReadOnly ? 'hidden' : ''" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
                + 添加问题
              </button>
            </div>
          </section>

          <!-- Unresolved Blockers -->
          <section class="col-span-12 lg:col-span-6 bg-[#201f1f] p-8 rounded-xl border-[0.5px_rgba(153,144,124,0.2)]">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-3">
                <span class="text-[#ffb4ab] font-['Manrope'] text-xs font-bold uppercase tracking-widest">04. 无法解决的问题</span>
                <h3 class="text-2xl font-bold font-['Manrope']">Blockers</h3>
              </div>
              <span class="material-symbols-outlined text-[#ffb4ab]">warning</span>
            </div>
            <div class="flex flex-col gap-4">
              <div v-for="(item, index) in data.blockers" :key="item.id" draggable="true" @dragstart="onDragStart('blockers', item)" @dragover.prevent="onDragOver('blockers', index)" @drop="onDrop('blockers', index)" @dragend="onDragEnd" :class="{'opacity-50': draggedItem?.item.id === item.id, 'border-t-2 border-[#f2ca50]': dragOverIndex?.type === 'blockers' && dragOverIndex?.index === index}" class="flex items-center justify-between bg-[#93000a]/20 p-3 rounded-lg border-l-4 border-[#ffb4ab]">
                <div class="flex items-center gap-3 flex-1">
                  <input v-if="editingId === item.id" v-model="editingTitle" @blur="saveEdit(item.id)" @keyup.enter="saveEdit(item.id)" class="bg-[#3a3939] text-[#ffdad6] font-bold text-sm px-2 py-1 rounded outline-none border border-[#ffb4ab]" autofocus /><h4 v-else @click="startEdit(item)" class="text-[#ffdad6] font-bold text-sm cursor-pointer hover:text-[#f2ca50]">{{ item.title }}</h4>
                  <span class="text-[10px] font-bold text-[#ffb4ab]">CRITICAL</span>
                </div>
                <button @click.stop="!isReadOnly && deleteItem('blockers', item.id)" :class="isReadOnly ? 'hidden' : ''" class="material-symbols-outlined text-xs text-[#d0c5af] hover:text-[#ffb4ab] transition-all">delete</button>
              </div>
              <button @click="!isReadOnly && openAddModal('blockers')" :class="isReadOnly ? 'hidden' : ''" class="w-full py-2 border border-dashed border-[#99907c]/30 rounded-lg text-xs font-bold text-[#d0c5af] hover:border-[#ffb4ab] hover:text-[#ffb4ab] transition-all uppercase tracking-widest">
                Report New Blocker
              </button>
            </div>
          </section>
        </div>

        <!-- Contextual Insight Footer -->
        <div class="mt-8 flex gap-6 items-center">
          <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
          <div class="flex items-center gap-2 text-[#d0c5af] text-[10px] uppercase tracking-[0.2em] font-['Manrope']">
            <span class="material-symbols-outlined text-xs">history_toggle_off</span>
            Last synced just now
          </div>
          <div class="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#99907c]/20 to-transparent"></div>
        </div>
        </template>

        <!-- History View -->
        <template v-if="currentView === 'history'">
          <section class="mb-16">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-5xl font-extrabold font-['Manrope'] tracking-tighter text-[#e5e2e1] mb-4">Historical Archives</h1>
                <p class="text-[#d0c5af] max-w-xl text-lg font-light leading-relaxed">Review your journey of productivity. Every summary is a testament to your discipline.</p>
              </div>
              <div class="flex gap-3">
                <button @click="showImportHelp = true" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm">help</span>
                  导入帮助
                </button>
                <button @click="exportData" class="px-4 py-2 rounded-md border border-[#99907c]/40 text-[#d0c5af] text-sm font-semibold hover:border-[#f2ca50] hover:text-[#f2ca50] transition-all flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm">download</span>
                  导出数据
                </button>
                <label class="px-4 py-2 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer">
                  <span class="material-symbols-outlined text-sm">upload</span>
                  导入数据
                  <input type="file" accept=".json" class="hidden" @change="importData"/>
                </label>
              </div>
            </div>
          </section>

          <div v-if="copySuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
            <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
            <span class="text-[#4ade80] text-sm">复制成功</span>
          </div>

          <div class="flex flex-wrap justify-between items-end mb-12 gap-6">
            <div class="flex gap-4">
              <div class="flex flex-col space-y-2">
                <span class="text-[10px] uppercase tracking-widest text-[#f2ca50] font-bold">Timeframe</span>
                <div class="flex bg-[#201f1f] rounded-md p-1 border border-[rgba(153,144,124,0.2)]">
                  <button @click="timeframe = 'all'" :class="timeframe === 'all' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">All Time</button>
                  <button @click="timeframe = 'month'" :class="timeframe === 'month' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">This Month</button>
                  <button @click="timeframe = 'week'" :class="timeframe === 'week' ? 'bg-[#3a3939] text-[#f2ca50]' : 'hover:bg-[#3a3939]/50'" class="px-4 py-1.5 text-xs rounded transition-all">Last 7 Days</button>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8 space-y-6">
              <article v-for="date in filteredDates.slice(0, 5)" :key="date" class="bg-[#201f1f] p-8 rounded-xl border border-[rgba(153,144,124,0.2)] relative overflow-hidden group cursor-pointer" @click="showHistoryModal(date)">
                <div class="absolute top-0 left-0 w-1 h-full bg-[#f2ca50] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <span class="text-[10px] uppercase tracking-widest text-[#f2ca50] font-bold mb-1 block">{{ formatDateFull(date) }}</span>
                    <h3 class="text-2xl font-bold font-['Manrope']">Daily Summary</h3>
                  </div>
                  <div class="flex gap-2">
                    <button @click.stop="copyHistorySummaryByDate(date)" class="w-10 h-10 flex items-center justify-center bg-[#2a2a2a] rounded-lg hover:text-[#f2ca50] transition-colors border border-[rgba(153,144,124,0.2)]" title="Copy Summary">
                      <span class="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-[10px] uppercase text-[#d0c5af] font-bold mb-2 tracking-tighter">Summary</p>
                    <ul class="space-y-2 text-sm text-[#e5e2e1]/90">
                      <li class="flex items-start"><span class="material-symbols-outlined text-[#f2ca50] text-xs mr-2 mt-0.5">check_circle</span> {{ getItemCount(date).todos }} Tasks</li>
                      <li class="flex items-start"><span class="material-symbols-outlined text-[#f2ca50] text-xs mr-2 mt-0.5">check_circle</span> {{ getItemCount(date).completed }} Completed</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            <div class="lg:col-span-4 space-y-8">
              <div class="bg-[#201f1f] p-6 rounded-xl border border-[rgba(153,144,124,0.2)]">
                <div class="flex justify-between items-center mb-6">
                  <h5 class="font-bold text-sm uppercase tracking-widest text-[#f2ca50]">{{ displayMonth }}</h5>
                  <div class="flex gap-2">
                    <button @click="changeMonth(-1)" class="material-symbols-outlined text-sm">chevron_left</button>
                    <button @click="changeMonth(1)" class="material-symbols-outlined text-sm">chevron_right</button>
                  </div>
                </div>
                <div class="grid grid-cols-7 gap-2 text-center text-[10px] text-[#d0c5af] mb-4">
                  <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                </div>
                <div class="grid grid-cols-7 gap-2 text-center">
                  <template v-for="day in calendarDays" :key="day.date">
                    <button v-if="day.day > 0" @click="day.hasData && showHistoryModal(day.date)" class="text-xs py-2 rounded transition" :class="{'bg-[#f2ca50]/40 text-[#f2ca50] font-bold': day.date === currentDate, 'text-[#f2ca50]': day.hasData && day.date !== currentDate, 'text-[#99907c] opacity-40': !day.hasData}" :disabled="!day.hasData">{{ day.day }}</button>
                    <span v-else class="text-xs"></span>
                  </template>
                </div>
              </div>

              <div class="bg-[#201f1f] p-6 rounded-xl border border-[rgba(153,144,124,0.2)]">
                <p class="text-[10px] uppercase text-[#f2ca50] font-bold mb-4 tracking-widest">Monthly Stats</p>
                <div class="space-y-4">
                  <div>
                    <p class="text-3xl font-extrabold">{{ filteredDates.length }} <span class="text-sm font-light text-[#d0c5af]">days</span></p>
                    <p class="text-xs text-[#d0c5af] mt-1">Total Entries</p>
                  </div>
                </div>
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
          {{ addType === 'todos' ? '添加待办事项' : addType === 'completed' ? '添加已完成' : addType === 'issues' ? '发现问题' : '无法解决的问题' }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-[#d0c5af] mb-1">标题</label>
            <input v-model="addTitle" type="text" class="w-full bg-[#353534] text-[#e5e2e1] px-3 py-2 rounded-lg border-none outline-none focus:ring-1 focus:ring-[#f2ca50]" placeholder="输入标题..." @keyup.enter="submitAdd"/>
          </div>
          <div v-if="addType === 'todos'">
            <label class="block text-sm text-[#d0c5af] mb-1">优先级</label>
            <div class="flex gap-2">
              <button v-for="p in priorities" :key="p.value" @click="addPriority = p.value" class="flex-1 py-2 rounded-lg border transition" :class="addPriority === p.value ? `bg-${p.color}/20 border-${p.color} text-${p.color}` : 'border-[#99907c] text-[#d0c5af]'">{{ p.label }}</button>
            </div>
          </div>
          <div v-if="addType === 'issues'">
            <label class="block text-sm text-[#d0c5af] mb-1">严重程度</label>
            <div class="flex gap-2">
              <button v-for="s in severities" :key="s.value" @click="addSeverity = s.value" class="flex-1 py-2 rounded-lg border transition" :class="addSeverity === s.value ? `bg-${s.color}/20 border-${s.color} text-${s.color}` : 'border-[#99907c] text-[#d0c5af]'">{{ s.label }}</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showAddModal = false" class="flex-1 py-2 border border-[#99907c] text-[#d0c5af] rounded-lg hover:border-[#f2ca50] transition">取消</button>
          <button @click="submitAdd" class="flex-1 py-2 bg-[#f2ca50] text-[#3c2f00] font-bold rounded-lg hover:brightness-110 transition">添加</button>
        </div>
      </div>
    </div>

    <!-- History Detail Modal -->
    <div v-if="showHistoryModalFlag && historyModalData" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showHistoryModalFlag = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-[#f2ca50] font-bold">{{ formatDateFull(historyModalData.date) }}</span>
            <h3 class="text-2xl font-bold font-['Manrope'] mt-1">Daily Summary (只读)</h3>
          </div>
          <button @click="showHistoryModalFlag = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>

        <div class="mb-6">
          <button @click="showHistorySummaryTab = 'detail'" :class="showHistorySummaryTab === 'detail' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-l-lg text-sm font-bold transition-colors">详情</button>
          <button @click="showHistorySummaryTab = 'text'" :class="showHistorySummaryTab === 'text' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-r-lg text-sm font-bold transition-colors">摘要</button>
        </div>

        <!-- Detail View -->
        <div v-if="showHistorySummaryTab === 'detail'" class="space-y-6">
          <div v-if="historyModalData.todos?.length">
            <h4 class="text-sm font-bold text-[#f2ca50] uppercase tracking-wider mb-3">待办事项</h4>
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
            <h4 class="text-sm font-bold text-[#4ade80] uppercase tracking-wider mb-3">已完成</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.completed" :key="item.id" class="p-3 rounded bg-[#1c1b1b]/40 border-l-2 border-[#4ade80] flex items-center gap-3">
                <span class="material-symbols-outlined text-[#4ade80] text-sm">check_circle</span>
                <span class="text-[#d0c5af] line-through">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="historyModalData.issues?.length">
            <h4 class="text-sm font-bold text-[#ffe066] uppercase tracking-wider mb-3">发现问题</h4>
            <div class="space-y-2">
              <div v-for="item in historyModalData.issues" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center justify-between">
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
                <span class="text-xs px-2 py-0.5 rounded" :class="{
                  'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                  'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                  'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                }">{{ item.severity === 'high' ? '严重' : item.severity === 'mid' ? '一般' : '轻微' }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="historyModalData.blockers?.length">
            <h4 class="text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-3">无法解决的问题</h4>
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
            <span class="text-sm">复制成功</span>
          </div>
          <button @click="copyHistorySummary(historyModalData)" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">content_copy</span>
            复制摘要
          </button>
        </div>
      </div>
    </div>

    <!-- Import Help Modal -->
    <div v-if="showImportHelp" class="fixed inset-0 bg-[#0D0D0D]/80 flex items-center justify-center z-50" @click.self="showImportHelp = false">
      <div class="bg-[#201f1f] rounded-xl border border-[#f2ca50] p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="text-2xl font-bold font-['Manrope'] text-[#f2ca50]">数据导入帮助</h3>
          </div>
          <button @click="showImportHelp = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>
        
        <div class="space-y-6 text-[#d0c5af]">
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📤 导出数据</h4>
            <p class="text-sm">点击"导出数据"按钮，将当前所有历史记录下载为 JSON 文件。</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📥 导入数据</h4>
            <p class="text-sm">点击"导入数据"按钮，选择导出的 JSON 文件即可导入数据。</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">🔄 同步说明</h4>
            <ul class="text-sm space-y-2">
              <li>• 导入时会合并数据，相同日期的数据会被覆盖</li>
              <li>• 建议导出前先备份当前数据</li>
              <li>• 可以在不同电脑间通过文件传输同步数据</li>
            </ul>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-4">
            <h4 class="font-bold text-[#f2ca50] mb-2">📋 文件格式</h4>
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
          <button @click="showImportHelp = false" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition">知道了</button>
        </div>
      </div>
    </div>

    <!-- Import Success/Error Toast -->
    <div v-if="importSuccess" class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#201f1f] border border-[#4ade80] rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
      <span class="material-symbols-outlined text-[#4ade80]">check_circle</span>
      <span class="text-[#4ade80] text-sm">导入成功</span>
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
            <h3 class="text-2xl font-bold font-['Manrope'] mt-1" :class="isReadOnly ? 'text-[#99907c]' : ''">Daily Summary{{ isReadOnly ? ' (只读)' : '' }}</h3>
          </div>
          <button @click="showSummaryModalFlag = false" class="material-symbols-outlined text-[#d0c5af] hover:text-[#f2ca50]">close</button>
        </div>

        <div v-if="!isReadOnly" class="mb-6">
          <button @click="showSummaryTab = 'detail'" :class="showSummaryTab === 'detail' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-l-lg text-sm font-bold transition-colors">详情</button>
          <button @click="showSummaryTab = 'text'" :class="showSummaryTab === 'text' ? 'bg-[#f2ca50] text-[#3c2f00]' : 'text-[#d0c5af] bg-[#2a2a2a]'" class="px-4 py-2 rounded-r-lg text-sm font-bold transition-colors">摘要</button>
        </div>

        <!-- Detail View -->
        <div v-if="showSummaryTab === 'detail'" class="space-y-6">
          <div v-if="data.todos.length">
            <h4 class="text-sm font-bold text-[#f2ca50] uppercase tracking-wider mb-3">待办事项</h4>
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
            <h4 class="text-sm font-bold text-[#4ade80] uppercase tracking-wider mb-3">已完成</h4>
            <div class="space-y-2">
              <div v-for="item in data.completed" :key="item.id" class="p-3 rounded bg-[#1c1b1b]/40 border-l-2 border-[#4ade80] flex items-center gap-3">
                <span class="material-symbols-outlined text-[#4ade80] text-sm">check_circle</span>
                <span class="text-[#d0c5af] line-through">{{ item.title }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.issues.length">
            <h4 class="text-sm font-bold text-[#ffe066] uppercase tracking-wider mb-3">发现问题</h4>
            <div class="space-y-2">
              <div v-for="item in data.issues" :key="item.id" class="p-3 rounded bg-[#2a2a2a]/50 flex items-center justify-between">
                <span class="text-[#e5e2e1]">{{ item.title }}</span>
                <span class="text-xs px-2 py-0.5 rounded" :class="{
                  'bg-[#ffb4ab]/20 text-[#ffb4ab]': item.severity === 'high',
                  'bg-[#ffb84d]/20 text-[#ffb84d]': item.severity === 'mid',
                  'bg-[#ffe066]/20 text-[#ffe066]': item.severity === 'low'
                }">{{ item.severity === 'high' ? '严重' : item.severity === 'mid' ? '一般' : '轻微' }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="data.blockers.length">
            <h4 class="text-sm font-bold text-[#ffb4ab] uppercase tracking-wider mb-3">无法解决的问题</h4>
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
            <span class="text-sm">复制成功</span>
          </div>
          <button @click="copyCurrentSummary" class="px-6 py-2.5 rounded-md bg-[#f2ca50] text-[#3c2f00] text-sm font-bold hover:brightness-110 transition flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">content_copy</span>
            复制摘要
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { DayData, Item, Priority, Severity } from './types'

const currentDate = ref(new Date().toISOString().split('T')[0])
const currentView = ref('dashboard')
const showHistory = ref(true)
const showAddModal = ref(false)
const addType = ref('')
const addTitle = ref('')
const addPriority = ref<Priority>('mid')
const addSeverity = ref<Severity>('mid')
const dates = ref<string[]>([])
const calendarDays = ref<{day: number, date: string, hasData: boolean}[]>([])
const displayMonth = ref('')
const timeframe = ref('all')

const filteredDates = computed(() => {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  
  if (timeframe.value === 'week') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    return dates.value.filter(d => d >= weekAgo && d <= today)
  } else if (timeframe.value === 'month') {
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    return dates.value.filter(d => d >= monthStart && d <= today)
  }
  return dates.value
})
const isReadOnly = ref(false)
const showHistoryModalFlag = ref(false)
const showImportHelp = ref(false)
const importSuccess = ref(false)
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

function generateSummaryText(date: string, d: DayData): string {
  let text = `${date} Daily Summary\n${'='.repeat(20)}\n\n`
  if (d.todos?.length) {
    text += `【待办事项】\n`
    d.todos.forEach(i => text += `- [${i.priority === 'high' ? '高' : i.priority === 'mid' ? '中' : '低'}] ${i.title}\n`)
    text += '\n'
  }
  if (d.completed?.length) {
    text += `【已完成事项】\n`
    d.completed.forEach(i => text += `- [完成] ${i.title}\n`)
    text += '\n'
  }
  if (d.issues?.length) {
    text += `【发现问题】\n`
    d.issues.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
    text += '\n'
  }
  if (d.blockers?.length) {
    text += `【无法解决的问题】\n`
    d.blockers.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
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
  const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' })
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
      const data = JSON.parse(e.target?.result as string)
      let count = 0
      for (const [date, dayData] of Object.entries(data)) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          localStorage.setItem(date, JSON.stringify(dayData))
          count++
        }
      }
      importSuccess.value = true
      setTimeout(() => { importSuccess.value = false }, 3000)
      const keys = Object.keys(localStorage)
      dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
      generateCalendarDays()
    } catch (err) {
      importError.value = '文件格式错误'
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

const priorities = [
  { value: 'high' as Priority, label: '高', color: 'priorityHigh' },
  { value: 'mid' as Priority, label: '中', color: 'priorityMid' },
  { value: 'low' as Priority, label: '低', color: 'priorityLow' }
]

const severities = [
  { value: 'high' as Severity, label: '严重', color: 'severityHigh' },
  { value: 'mid' as Severity, label: '一般', color: 'severityMid' },
  { value: 'low' as Severity, label: '轻微', color: 'severityLow' }
]

function loadDate(date: string) {
  currentDate.value = date
  isReadOnly.value = isHistoricalDate(date)
  const saved = localStorage.getItem(date)
  if (saved) {
    Object.assign(data, JSON.parse(saved))
  } else {
    data.date = date
    data.todos = []
    data.completed = []
    data.issues = []
    data.blockers = []
    carryOverFromYesterday(date)
  }
}

function carryOverFromYesterday(date: string) {
  const yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().split('T')[0]
  const yData = localStorage.getItem(yStr)
  if (!yData) return
  const y = JSON.parse(yData)
  if (y.todos?.length) {
    y.todos.forEach((t: Item) => {
      const item = { ...t, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      data.todos.push(item)
    })
  }
  if (y.issues?.length) {
    y.issues.forEach((i: Item) => {
      const item = { ...i, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
      data.issues.push(item)
    })
  }
  if (y.blockers?.length) {
    y.blockers.forEach((b: Item) => {
      const item = { ...b, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
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

function selectDate(date: string) { 
  loadDate(date)
}

function openAddModal(type: string) {
  if (isReadOnly.value) return
  addType.value = type
  addTitle.value = ''
  showAddModal.value = true
}

function submitAdd() {
  if (!addTitle.value.trim()) return
  const item: Item = {
    id: crypto.randomUUID(),
    title: addTitle.value,
    priority: addType.value === 'todos' ? addPriority.value : undefined,
    severity: (addType.value === 'issues' || addType.value === 'blockers') ? addSeverity.value : undefined,
    createdAt: new Date().toISOString()
  }
  if (addType.value === 'todos') data.todos.push(item)
  else if (addType.value === 'completed') data.completed.push(item)
  else if (addType.value === 'issues') data.issues.push(item)
  else if (addType.value === 'blockers') data.blockers.push(item)
  saveData()
  showAddModal.value = false
  addTitle.value = ''
}

function toggleComplete(id: string) {
  const idx = data.todos.findIndex(i => i.id === id)
  if (idx > -1) {
    const item = data.todos.splice(idx, 1)[0]
    item.completedAt = new Date().toISOString()
    data.completed.unshift(item)
    saveData()
  }
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
  }
  editingId.value = null
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
  let text = `${date} Daily Summary\n${'='.repeat(20)}\n\n`
  if (data.todos.length) {
    text += `【待办事项】\n`
    data.todos.forEach(i => text += `- [${i.priority === 'high' ? '高' : i.priority === 'mid' ? '中' : '低'}] ${i.title}\n`)
    text += '\n'
  }
  if (data.completed.length) {
    text += `【已完成事项】\n`
    data.completed.forEach(i => text += `- [完成 ${i.completedAt?.split('T')[1]?.slice(0, 5)}] ${i.title}\n`)
    text += '\n'
  }
  if (data.issues.length) {
    text += `【发现问题】\n`
    data.issues.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
    text += '\n'
  }
  if (data.blockers.length) {
    text += `【无法解决的问题】\n`
    data.blockers.forEach(i => text += `- [${i.severity === 'high' ? '严重' : i.severity === 'mid' ? '一般' : '轻微'}] ${i.title}\n`)
  }
  window.electronAPI.clipboardWrite(text)
}

function minimize() { window.electronAPI?.minimize() }
function maximize() { window.electronAPI?.maximize() }
function close() { window.electronAPI?.close() }

onMounted(() => {
  loadDate(currentDate.value)
  const keys = Object.keys(localStorage)
  dates.value = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse()
  displayMonth.value = currentDate.value.slice(0, 7)
  generateCalendarDays()
})
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