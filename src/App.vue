<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <ul>
    <li>
      <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
    </li>
    <li>
      <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    </li>
  </ul>
  <RouterView />
</template>
