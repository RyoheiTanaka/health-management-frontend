<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSleepStore } from '@/stores/sleep'
import { getWeekDate, convertMilliseconds } from '@/utils/date'

interface SleepResult {
  id?: number
  date: string
  sleepTime: string
  sleepScore: string
}

const sleepStore = useSleepStore()
const oneWeekDate = getWeekDate()
const sleeps = computed(() => {
  const result: SleepResult[] = []

  oneWeekDate.forEach((date) => {
    const sleep = sleepStore.sleepList.find((item) => item.date_of_sleep == date)

    if (typeof sleep === 'undefined') {
      result.push({
        id: undefined,
        date: date,
        sleepTime: '-',
        sleepScore: '-',
      })
    } else {
      const { hours, minutes } = convertMilliseconds(sleep.duration)

      result.push({
        id: sleep.id,
        date: sleep.date_of_sleep,
        sleepTime: `${hours}時間${minutes}秒`,
        sleepScore: `${sleep.efficiency}点`,
      })
    }
  })

  return result
})

onMounted(async () => {
  if (sleepStore.sleepList.length === 0) {
    await sleepStore.getSleepList()
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-[30rem] lg:min-h-[40rem]">
      <h2 class="mb-8 text-xl font-bold text-black">睡眠</h2>
      <div v-if="sleepStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div class="flex flex-col">
          <div class="grid grid-cols-3 rounded-sm bg-gray-200">
            <div class="p-2.5 xl:p-5">
              <h3 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h3>
            </div>
            <div class="p-2.5 xl:p-5">
              <h3 class="text-sm font-medium text-gray-500 xsm:text-base">睡眠時間</h3>
            </div>
            <div class="p-2.5 xl:p-5">
              <h3 class="text-sm font-medium text-gray-500 xsm:text-base">睡眠スコア</h3>
            </div>
          </div>
          <template v-for="(sleep, index) in sleeps" :key="sleep.date">
            <div
              class="grid grid-cols-3"
              :class="{
                'border-b': index !== sleeps.length - 1,
                'border-stroke': index !== sleeps.length - 1,
              }"
            >
              <div class="p-2.5 xl:p-5">
                <p class="text-sm">{{ sleep.date }}</p>
              </div>
              <div class="p-2.5 xl:p-5">
                <p class="text-sm">{{ sleep.sleepTime }}</p>
              </div>
              <div class="p-2.5 xl:p-5">
                <p class="text-sm">{{ sleep.sleepScore }}</p>
              </div>
            </div>
          </template>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'sleepList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >view more</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
