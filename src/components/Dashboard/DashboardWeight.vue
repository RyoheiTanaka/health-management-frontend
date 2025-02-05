<script setup>
import { computed, onMounted } from 'vue'
import { useWeightStore } from '@/stores/weight'
import { getWeekDate } from '@/utils/date'

const weightStore = useWeightStore()
const oneWeekDate = getWeekDate()
const weights = computed(() => {
  const result = []
  if (weightStore.weightList.length !== 0) {
    oneWeekDate.forEach((date) => {
      const weight = weightStore.weightList.find((item) => item.date == date)

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
  }
  return result
})

onMounted(async () => {
  if (weightStore.weightList.length === 0) {
    await weightStore.getWeightList()
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-[30rem] lg:min-h-[40rem]">
      <h2 class="mb-8 text-xl font-bold text-black">体重</h2>
      <div v-if="weightStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
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
          <template v-for="(weight, index) in weights" :key="weight.date">
            <div
              class="grid grid-cols-3"
              :class="{
                'border-b': index !== weights.length - 1,
                'border-stroke': index !== weights.length - 1,
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
          </template>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'weightList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >view more</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
