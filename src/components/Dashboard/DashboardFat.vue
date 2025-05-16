<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFatStore } from '@/stores/fat'
import { getWeekDate } from '@/utils/date'

interface FatResult {
  id?: number
  date: string
  fat: string
}

const fatStore = useFatStore()
const oneWeekDate = getWeekDate()
const fats = computed(() => {
  const result: FatResult[] = []

  oneWeekDate.forEach((date) => {
    const fat = fatStore.fatList.find((item) => item.date == date)

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
})

onMounted(async () => {
  if (fatStore.fatList.length === 0) {
    await fatStore.getFatList()
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-[30rem] lg:min-h-[40rem]">
      <h2 class="mb-8 text-xl font-bold text-black">体脂肪</h2>
      <div v-if="fatStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div class="flex flex-col">
          <div class="grid grid-cols-2 rounded-sm bg-gray-200">
            <div class="p-2.5 xl:p-5">
              <h3 class="text-sm font-medium text-gray-500 xsm:text-base">日付</h3>
            </div>
            <div class="p-2.5 xl:p-5">
              <h3 class="text-sm font-medium text-gray-500 xsm:text-base">体脂肪率</h3>
            </div>
          </div>
          <template v-for="(fat, index) in fats" :key="fat.date">
            <div
              class="grid grid-cols-2"
              :class="{
                'border-b': index != fats.length - 1,
                'border-stroke': index != fats.length - 1,
              }"
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
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'fatList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >view more</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
