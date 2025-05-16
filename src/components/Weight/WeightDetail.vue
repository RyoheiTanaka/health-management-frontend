<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useWeightStore } from '@/stores/weight'

const route = useRoute()
const weightStore = useWeightStore()

const weight = computed(() => weightStore.weight)
const bmiLevel = computed(() => getBmiLevel(weightStore.weight.bmi))
const series = computed(() => [(weightStore.weight.bmi / 40) * 100])

const prevId = ref(null)
const chartOptions = ref({
  chart: {
    id: 'vuechart-weight-detail',
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
            const bmi = (40 * val) / 100
            const arr = String(bmi).split('.')
            if (arr[1]) {
              return bmi.toFixed(1)
            } else {
              return bmi.toFixed()
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
  labels: ['BMI'],
})

function getBmiLevel(bmi) {
  if (bmi < 18.5) {
    return '低体重'
  } else if (bmi < 25) {
    return '普通体重'
  } else if (bmi < 30) {
    return '肥満(1度)'
  } else if (bmi < 35) {
    return '肥満(2度)'
  } else if (bmi < 40) {
    return '肥満(3度)'
  } else {
    return '肥満(4度)'
  }
}

watchEffect(() => {
  const newId = route.params.id
  if (newId && newId !== prevId.value) {
    weightStore.getSelectedWeight(newId)
    prevId.value = newId
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">体重</h2>
      <div v-if="weightStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="weight">
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
            <div class="text-center text-2xl font-bold">{{ weight.weight }}kg</div>
          </div>
          <div class="lg:w-[50%]">
            <div class="flex flex-col">
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">計測日</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">{{ weight.date }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">体重</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">{{ weight.weight }}kg</p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">BMI</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">
                    {{ weight.bmi }} ({{ bmiLevel }})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'weightList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >back to Weight List</RouterLink
          >
        </div>
      </div>
      <div v-else>データが見つかりません</div>
    </div>
  </section>
</template>
