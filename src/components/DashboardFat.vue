<script setup>
import { ref, onMounted } from 'vue'
import { getDashboardFatList } from '@/apis/FitbitLog'
import { get1weekDate } from '@/utils/date'

const fats = ref({})
const fatData = ref([])

const formatedFatData = () => {
  const dates = get1weekDate()
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

onMounted(async () => {
  fats.value = await getDashboardFatList()
  fatData.value = formatedFatData()
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-[30rem] lg:min-h-[40rem]">
      <h2 class="mb-8 text-xl font-bold text-black">体脂肪</h2>
      <div class="flex flex-col">
        <div class="grid grid-cols-2 rounded-sm bg-gray-200">
          <div class="p-2.5 xl:p-5">
            <h3 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h3>
          </div>
          <div class="p-2.5 xl:p-5">
            <h3 class="text-sm font-medium text-gray-500 xsm:text-base">体脂肪率</h3>
          </div>
        </div>
        <template v-for="(fat, index) in fatData" :key="fat.date">
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
        </template>
      </div>
    </div>
  </section>
</template>
