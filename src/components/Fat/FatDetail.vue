<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useFatStore } from '@/stores/fat'

const route = useRoute()
const fatStore = useFatStore()

const fat = computed(() => fatStore.fat)
const obesityLevel = computed(() => getObesityLevel(fatStore.fat.fat))
const series = computed(() => [(fatStore.fat.fat / 30) * 100])

const prevId = ref(null)
const chartOptions = ref({
  chart: {
    id: 'vuechart-fat-detail',
    type: 'radialBar',
    height: 400,
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: '16px',
          color: undefined,
          offsetY: 120,
        },
        value: {
          formatter: function (val) {
            const percentage = (30 * val) / 100
            const arr = String(percentage).split('.')
            if (arr[1]) {
              return percentage.toFixed(1) + '%'
            } else {
              return percentage.toFixed() + '%'
            }
          },
          offsetY: 76,
          fontSize: '22px',
          color: undefined,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: ['Body Fat Percentage'],
})

function getObesityLevel(fat) {
  if (fat < 10) {
    return 'やせ'
  } else if (fat < 20) {
    return '標準'
  } else if (fat < 25) {
    return '軽肥満'
  } else {
    return '肥満'
  }
}

watchEffect(() => {
  const newId = route.params.id
  if (newId && newId !== prevId.value) {
    fatStore.getSelectedFat(newId)
    prevId.value = newId
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">体脂肪率</h2>
      <div v-if="fatStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="fat">
        <div class="flex flex-col justify-normal lg:flex-row lg:justify-between">
          <div id="card" class="m-0 mx-auto pb-8 lg:pb-0">
            <div id="chart">
              <apexchart
                type="radialBar"
                height="400"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </div>
          <div class="lg:w-[50%]">
            <div class="flex flex-col">
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">計測日</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">{{ fat.date }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">体脂肪率</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">{{ fat.fat }}%</p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">肥満度</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">{{ obesityLevel }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'fatList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >back to Fat List</RouterLink
          >
        </div>
      </div>
      <div v-else>データが見つかりません</div>
    </div>
  </section>
</template>
