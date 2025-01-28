<script setup>
import { ref, onBeforeMount } from 'vue'
import { getDashboardSleepList } from '@/apis/FitbitLog'
import { getWeekDate, convertMilliseconds } from '@/utils/date'

const sleeps = ref({})
const sleepData = ref([])

const formatedSleepData = () => {
  const dates = getWeekDate()
  const result = []

  dates.forEach((date) => {
    const sleep = sleeps.value.find((item) => item.date_of_sleep == date)

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
}

onBeforeMount(async () => {
  sleeps.value = await getDashboardSleepList()
  sleepData.value = formatedSleepData()
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-[30rem] lg:min-h-[40rem]">
      <h2 class="mb-8 text-xl font-bold text-black">睡眠</h2>
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
        <template v-for="(sleep, index) in sleepData" :key="sleep.date">
          <div
            class="grid grid-cols-3"
            :class="{
              'border-b': index !== sleepData.length - 1,
              'border-stroke': index !== sleepData.length - 1,
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
    </div>
  </section>
</template>
