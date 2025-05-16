<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()
const isOpen = ref(false)

const logout = async () => {
  authStore.setIsLoading(true)
  try {
    const result = await authStore.logout()
    if (result) {
      router.push('/login')
    }
  } catch (e) {
    console.log('ログアウトに失敗しました。', e)
  } finally {
    authStore.setIsLoading(false)
  }
}
</script>

<template>
  <header class="flex flex-1 justify-between px-6 py-4 lg:px-8 bg-white">
    <h1 class="text-lg">健康管理APP</h1>
    <nav class="flex">
      <div class="flex-initial font-bold">
        <ul class="md:flex hidden flex-initial text-left">
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'dashboard' }">TOP</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'badgeList' }">BADGE</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'weightList' }">WEIGHT</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'fatList' }">FAT</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'sleepList' }">SLEEP</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <RouterLink :to="{ name: 'settings' }">SETTING</RouterLink>
          </li>
          <li class="ml-8 hover:opacity-50">
            <button @click="logout">ログアウト</button>
          </li>
        </ul>
      </div>
      <div
        class="flex flex-row fixed top-0 right-0 min-h-fit min-w-full transform lg:translate-x-full transition duration-500 ease-in-out"
        :class="{ 'translate-x-(0)': isOpen, 'z-20': isOpen, 'translate-x-full': !isOpen }"
      >
        <div class="basis-1/2"></div>

        <div class="basis-1/2 bg-white">
          <ul class="text-center border-l-2">
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'dashboard' }">TOP</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'badgeList' }">BADGE</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'weightList' }">WEIGHT</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'fatList' }">FAT</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'sleepList' }">SLEEP</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <RouterLink :to="{ name: 'settings' }">SETTING</RouterLink>
            </li>
            <li class="p-4 border-b-2">
              <div class="rounded-xl bg-gray-500 text-white text-lg font-bold">
                <button @click="logout">ログアウト</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="z-30">
        <button @click="isOpen = !isOpen" class="flex-initial p-3 relative md:hidden">
          <span
            class="h-1 w-8 block absolute top-1 right-1 transition-all transform rotate-0"
            :class="{
              'bg-white': isOpen,
              'bg-black': !isOpen,
            }"
          ></span>
          <span
            class="h-1 w-8 block absolute top-1 right-1 bg-black transition-all transform"
            :class="{
              '-rotate-45': isOpen,
              '-translate-y-0 ': isOpen,
              'rotate-0': !isOpen,
              '-translate-y-2': !isOpen,
            }"
          ></span>
          <span
            class="h-1 w-8 block absolute top-1 right-1 bg-black transition-all transform"
            :class="{
              'rotate-45': isOpen,
              'translate-y-0': isOpen,
              'rotate-0': !isOpen,
              'translate-y-2': !isOpen,
            }"
          ></span>
        </button>
      </div>
    </nav>
  </header>
</template>
