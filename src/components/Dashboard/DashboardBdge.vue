<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBadgeStore } from '@/stores/badge'

const badgeStore = useBadgeStore()
const badges = computed(() => {
  const result = []
  if (badgeStore.badgeList.length !== 0) {
    for (let i = 0; i < 5; i++) {
      result.push(badgeStore.badgeList[i])
    }
  }
  return result
})

onMounted(async () => {
  if (badgeStore.badgeList.length === 0) {
    await badgeStore.getBadgeList()
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッチ</h2>
      <div v-if="badgeStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div class="m-0 mx-auto">
          <ul class="flex flex-col justify-normal lg:flex-row lg:justify-between">
            <li class="mx-2 xl:mx-8" v-for="badge in badges" :key="badge.name">
              <RouterLink :to="{ name: 'badgeDetail', params: { id: badge.id } }">
                <div class="mb-5 mx-auto w-32">
                  <img :src="badge.image125px" :alt="badge.description" />
                </div>
                <p class="text-center">{{ badge.short_name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'badgeList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >view more</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
