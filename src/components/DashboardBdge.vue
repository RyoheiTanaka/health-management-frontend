<script setup>
import { ref, onBeforeMount } from 'vue'
import { getDashboardBadgeListApi } from '@/apis/FitbitLog'

const badges = ref({})

onBeforeMount(async () => {
  badges.value = await getDashboardBadgeListApi()
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッチ</h2>
      <div class="m-0 mx-auto">
        <ul class="flex justify-center">
          <li class="mx-2 xl:mx-8" v-for="badge in badges" :key="badge.name">
            <div class="mb-5">
              <img :src="badge.image125px" :alt="badge.description" />
            </div>
            <p class="text-center">{{ badge.short_name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
