<script setup>
import { ref, onMounted } from 'vue'
import { getDashboardWeightList } from '@/apis/FitbitLog'
import { get1weekDate } from '@/utils/date'

const weights = ref({})
const weightData = ref([])

const formatedSleepData = () => {
  const dates = get1weekDate()
  const result = []

  dates.forEach((date) => {
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
        bmi: weight.bmi,
      })
    }
  })

  return result
}

onMounted(async () => {
  weights.value = await getDashboardWeightList()
  weightData.value = formatedSleepData()
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200">
      <h2 class="mb-8 text-xl font-bold text-black">体重</h2>
      <div class="flex flex-col">
        <div class="grid grid-cols-3 rounded-sm bg-gray-200">
          <div class="p-2.5 xl:p-5">
            <h3 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h3>
          </div>
          <div class="p-2.5 xl:p-5">
            <h3 class="text-sm font-medium text-gray-500 xsm:text-base">体重</h3>
          </div>
          <div class="p-2.5 xl:p-5">
            <h3 class="text-sm font-medium text-gray-500 xsm:text-base">BMI</h3>
          </div>
        </div>
        <template v-for="(weight, index) in weightData" :key="weight.date">
          <div
            class="grid grid-cols-3"
            :class="{ 'border-b': index !== 6, 'border-stroke': index !== 6 }"
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
        </template>
      </div>
    </div>
  </section>
</template>
