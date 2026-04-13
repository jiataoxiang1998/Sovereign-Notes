<template>
  <header class="bg-neutral-900/80 backdrop-blur-md sticky top-0 flex justify-between items-center h-16 px-12 z-40 border-b border-neutral-100/10">
    <div class="flex items-center space-x-12">
      <nav class="flex space-x-8">
        <a class="text-[#D4AF37] font-bold font-headline text-sm tracking-tight" href="#">Focus</a>
        <a class="text-neutral-400 font-medium font-headline text-sm tracking-tight hover:text-[#D4AF37] transition-all" href="#">Analytics</a>
        <a class="text-neutral-400 font-medium font-headline text-sm tracking-tight hover:text-[#D4AF37] transition-all" href="#">Settings</a>
      </nav>
    </div>
    <div class="flex items-center space-x-6">
      <div class="relative">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">search</span>
        <input 
          class="bg-surface-container-highest border-none rounded-md pl-10 pr-4 py-1.5 text-xs text-on-surface focus:ring-0 gold-underline w-64" 
          placeholder="Search Atelier..." 
          type="text"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>