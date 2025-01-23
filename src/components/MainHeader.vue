<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'

const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const router = useRouter()

async function logout() {
  loadingStore.setLoading(true)
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.log(error)
  } finally {
    loadingStore.setLoading(false)
  }
}
</script>

<template>
  <header class="flex flex-1 justify-between px-6 py-4 lg:px-8 bg-white">
    <h1 class="text-lg">健康管理APP</h1>
    <nav>
      <ul class="flex justify-between">
        <li class="ml-8 hover:opacity-50">
          <RouterLink :to="{ name: 'dashboard' }">TOP</RouterLink>
        </li>
        <li class="ml-8 hover:opacity-50">
          <RouterLink :to="{ name: 'badge' }">BADGE</RouterLink>
        </li>
        <li class="ml-8 hover:opacity-50">
          <RouterLink :to="{ name: 'weight' }">WEIGHT</RouterLink>
        </li>
        <li class="ml-8 hover:opacity-50">
          <RouterLink :to="{ name: 'fat' }">FAT</RouterLink>
        </li>
        <li class="ml-8 hover:opacity-50">
          <RouterLink :to="{ name: 'sleep' }">SLEEP</RouterLink>
        </li>
        <li class="ml-8 hover:opacity-50">
          <button @click="logout">ログアウト</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
