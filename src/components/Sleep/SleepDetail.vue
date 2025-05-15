<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useSleepStore } from '@/stores/sleep'
import { convertMilliseconds } from '@/utils/date'

const route = useRoute()
const sleepStore = useSleepStore()

const sleep = computed(() => sleepStore.sleep)
const series = computed(() => [(sleepStore.sleep.duration / 36000000) * 100])
const convertTime = computed(() => convertMilliseconds(sleep.value.duration))

const prevId = ref(null)
const chartOptions = ref({
  chart: {
    id: 'vuechart-sleep-detail',
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
            return val.toFixed(1) + '%'
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
  labels: ['Sleep Time Percentage'],
})

watchEffect(() => {
  const newId = route.params.id
  if (newId && newId !== prevId.value) {
    sleepStore.getSelectedSleep(newId)
    prevId.value = newId
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">睡眠</h2>
      <div v-if="sleepStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="sleep">
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
            <div class="text-center text-2xl font-bold">
              {{ convertTime.hours }}時間{{ convertTime.minutes }}秒
            </div>
          </div>
          <div class="lg:w-[50%]">
            <div class="flex flex-col">
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">計測日</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">
                    {{ sleep.date_of_sleep }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">睡眠時間</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">
                    {{ convertTime.hours }}時間{{ convertTime.minutes }}秒
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">睡眠スコア</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <p class="text-sm font-medium text-black xsm:text-base">
                    {{ sleep.efficiency }}点
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'sleepList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >back to Sleep List</RouterLink
          >
        </div>
      </div>
      <div v-else>データが見つかりません</div>
    </div>
  </section>
</template>
