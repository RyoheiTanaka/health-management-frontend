<script setup>
import { getFatListApi } from '@/apis/FitbitLog'
import { getWeekDate } from '@/utils/date'
import { onBeforeMount, ref } from 'vue'

const date = getWeekDate(2)
const fats = ref({})
const fatData = ref({})

const chartOptions = ref({
  chart: {
    id: 'vuechart-fat-list',
    type: 'line',
    height: 400,
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    min: 5,
    max: 30,
  },
  xaxis: {
    categories: date,
  },
})

const series = ref([
  {
    name: '体脂肪率',
    data: [],
  },
])

const formatedFatData = (dates) => {
  const result = []

  dates.forEach((date) => {
    const fat = fats.value.find((item) => item.date == date)

    if (typeof fat === 'undefined') {
      result.push({
        id: undefined,
        date: date,
        fat: '-',
      })
    } else {
      result.push({
        id: fat.id,
        date: fat.date,
        fat: `${fat.fat}%`,
      })
    }
  })

  return result
}

onBeforeMount(async () => {
  fats.value = await getFatListApi()
  fatData.value = formatedFatData(date)
  date.forEach((item) => {
    const result = fats.value.find(({ date }) => date === item)
    if (typeof result !== 'undefined') {
      series.value[0].data.push(result.fat)
    } else {
      series.value[0].data.push(null)
    }
  })
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">体脂肪率</h2>
      <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold">グラフ</h3>
        <div id="chart">
          <apexchart height="400" type="line" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-bold">一覧</h3>
        <div class="flex flex-col">
          <div class="grid grid-cols-2 rounded-sm bg-gray-200">
            <div class="p-2.5 xl:p-5">
              <h4 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h4>
            </div>
            <div class="p-2.5 xl:p-5">
              <h4 class="text-sm font-medium text-gray-500 xsm:text-base">体脂肪率</h4>
            </div>
          </div>
          <template v-for="(fat, index) in fatData" :key="fat.date">
            <RouterLink
              v-if="typeof fat.id !== 'undefined'"
              :to="{ name: 'fatDetail', params: { id: fat.id } }"
              class="transition-all duration-300 hover:bg-slate-200 hover:opacity-50"
            >
              <div
                class="grid grid-cols-2"
                :class="{
                  'border-b': index != fatData.length - 1,
                  'border-stroke': index != fatData.length - 1,
                }"
              >
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ fat.date }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ fat.fat }}</p>
                </div>
              </div>
            </RouterLink>
            <a v-else @click.stop>
              <div
                class="grid grid-cols-2"
                :class="{ 'border-b': index != 6, 'border-stroke': index != 6 }"
              >
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ fat.date }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ fat.fat }}</p>
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
