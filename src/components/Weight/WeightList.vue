<script setup>
import { getWeightListApi } from '@/apis/FitbitLog'
import { getWeekDate } from '@/utils/date'
import { onBeforeMount, ref } from 'vue'

const twoWeekDate = getWeekDate(2)
const weights = ref({})
const weightData = ref({})

const chartOptions = ref({
  chart: {
    id: 'vuechart-weight-list',
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
    min: 0,
    max: 100,
  },
  xaxis: {
    categories: twoWeekDate,
  },
})

const series = ref([
  {
    name: '体重',
    data: [],
  },
])

const formatedWeightData = (propsDate) => {
  const result = []

  propsDate.forEach((date) => {
    const weight = weights.value.find((item) => item.date == date)

    if (typeof weight === 'undefined') {
      result.push({
        id: undefined,
        date: date,
        weight: '-',
        bmi: '-',
      })
    } else {
      result.push({
        id: weight.id,
        date: weight.date,
        weight: `${weight.weight}kg`,
        bmi: parseFloat(weight.bmi).toFixed(1),
      })
    }
  })

  return result
}

onBeforeMount(async () => {
  weights.value = await getWeightListApi()
  weightData.value = formatedWeightData(twoWeekDate)
  twoWeekDate.forEach((item) => {
    const result = weights.value.find(({ date }) => date === item)
    if (typeof result !== 'undefined') {
      series.value[0].data.push(result.weight)
    } else {
      series.value[0].data.push(null)
    }
  })
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">体重</h2>
      <div class="mb-8">
        <h3 class="mb-4 text-lg font-bold">グラフ</h3>
        <div id="chart">
          <apexchart height="400" type="line" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
      <div>
        <h3 class="mb-4 text-lg font-bold">一覧</h3>
        <div class="flex flex-col">
          <div class="grid grid-cols-3 rounded-sm bg-gray-200">
            <div class="p-2.5 xl:p-5">
              <h4 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h4>
            </div>
            <div class="p-2.5 xl:p-5">
              <h4 class="text-sm font-medium text-gray-500 xsm:text-base">体重</h4>
            </div>
            <div class="p-2.5 xl:p-5">
              <h4 class="text-sm font-medium text-gray-500 xsm:text-base">BMI</h4>
            </div>
          </div>
          <template v-for="(weight, index) in weightData" :key="weight.date">
            <RouterLink
              v-if="typeof weight.id !== 'undefined'"
              :to="{ name: 'weightDetail', params: { id: weight.id } }"
              class="transition-all duration-300 hover:bg-slate-200 hover:opacity-50"
            >
              <div
                class="grid grid-cols-3"
                :class="{
                  'border-b': index != weightData.length - 1,
                  'border-stroke': index != weightData.length - 1,
                }"
              >
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.date }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.weight }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.bmi }}</p>
                </div>
              </div>
            </RouterLink>
            <a v-else @click.stop>
              <div
                class="grid grid-cols-3"
                :class="{ 'border-b': index != 6, 'border-stroke': index != 6 }"
              >
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.date }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.weight }}</p>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm">{{ weight.bmi }}</p>
                </div>
              </div>
            </a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
