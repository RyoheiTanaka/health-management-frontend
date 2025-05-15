<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSleepStore } from '@/stores/sleep'
import { convertMilliseconds, getWeekDate } from '@/utils/date'

const twoWeekDate = getWeekDate(2)
const sleepStore = useSleepStore()
const sleepData = computed(() => formatedSleepData(twoWeekDate, sleepStore.sleepList))

const chartOptions = ref({
  chart: {
    id: 'vuechart-sleep-list',
    type: 'bar',
    height: 400,
    offsetY: 10,
    zoom: {
      enabled: false,
    },
  },
  xaxis: {
    categories: twoWeekDate,
  },
  yaxis: {
    max: 15,
  },
  dataLabels: {
    enabled: false,
  },
})

const series = ref([
  {
    name: '睡眠時間',
    data: [],
  },
])

const formatedSleepData = (propsDate, propsListData) => {
  const result = []

  propsDate.forEach((date) => {
    const sleep = propsListData.find((item) => item.date_of_sleep == date)

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

onMounted(async () => {
  if (sleepStore.sleepList.length === 0) {
    await sleepStore.getSleepList()
  }
  twoWeekDate.forEach((item) => {
    const result = sleepStore.sleepList.find(({ date_of_sleep }) => date_of_sleep === item)
    if (typeof result !== 'undefined') {
      const { hours } = convertMilliseconds(result.duration)
      series.value[0].data.push({
        x: item,
        y: hours,
      })
    } else {
      series.value[0].data.push({
        x: item,
        y: null,
      })
    }
  })
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">睡眠</h2>
      <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold">グラフ</h3>
        <div id="chart">
          <apexchart height="400" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-bold">一覧</h3>
        <div v-if="sleepStore.isLoading">
          <p>Loading...</p>
        </div>
        <div v-else class="flex flex-col">
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
            <RouterLink
              v-if="typeof sleep.id !== 'undefined'"
              :to="{ name: 'sleepDetail', params: { id: sleep.id } }"
              class="transition-all duration-300 hover:bg-slate-200 hover:opacity-50"
            >
              <div
                class="grid grid-cols-3"
                :class="{
                  'border-b': index != sleepData.length - 1,
                  'border-stroke': index != sleepData.length - 1,
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
            </RouterLink>
            <a v-else @click.stop>
              <div
                class="grid grid-cols-3"
                :class="{ 'border-b': index != 6, 'border-stroke': index != 6 }"
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
            </a>
          </template>
          <div class="text-right mt-4">
            <RouterLink
              :to="{ name: 'dashboard' }"
              class="text-base underline text-blue-500 hover:opacity-50"
            >
              back to Dashboard
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
