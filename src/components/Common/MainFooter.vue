<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="flex flex-1 justify-between px-6 py-4 lg:px-8 bg-white min-h-60">
    <nav>
      <ul class="flex flex-col">
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'dashboard' }">TOP</RouterLink>
        </li>
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'badgeList' }">BADGE</RouterLink>
        </li>
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'weightList' }">WEIGHT</RouterLink>
        </li>
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'fatList' }">FAT</RouterLink>
        </li>
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'sleepList' }">SLEEP</RouterLink>
        </li>
        <li class="my-4 hover:opacity-50">
          <RouterLink :to="{ name: 'settings' }">SETTING</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-end">
      <p class="text-gray-500">© 2025 coolat.net</p>
    </div>
  </footer>
</template>
