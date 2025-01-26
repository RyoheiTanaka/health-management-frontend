<script setup>
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useBadgeStore } from '@/stores/badge'

const route = useRoute()
const badgeStore = useBadgeStore()
const id = route.params.id

onBeforeMount(async () => {
  if (Object.keys(badgeStore.badge).length == 0 || badgeStore.badge.id != id) {
    await badgeStore.getBadge(id)
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッジ</h2>
      <div
        v-if="badgeStore.isFetched"
        class="flex flex-col justify-normal lg:flex-row lg:justify-between"
      >
        <div class="m-0 mx-auto pb-8 lg:pb-0">
          <img :src="badgeStore.badge.image300px" alt="" />
        </div>
        <div class="lg:w-[50%]">
          <div class="flex flex-col">
            <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-gray-500 xsm:text-base">名称</h3>
              </div>
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-black xsm:text-base">
                  {{ badgeStore.badge.short_name }}
                </h3>
              </div>
            </div>
            <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-gray-500 xsm:text-base">カテゴリー</h3>
              </div>
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-black xsm:text-base">
                  {{ badgeStore.badge.category }}
                </h3>
              </div>
            </div>
            <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-gray-500 xsm:text-base">バッジタイプ</h3>
              </div>
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-black xsm:text-base">
                  {{ badgeStore.badge.badge_type }}
                </h3>
              </div>
            </div>
            <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-gray-500 xsm:text-base">説明</h3>
              </div>
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-black xsm:text-base">
                  {{ badgeStore.badge.description }}
                </h3>
              </div>
            </div>
            <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-gray-500 xsm:text-base">取得回数</h3>
              </div>
              <div class="p-2.5 xl:p-5">
                <h3 class="text-sm font-medium text-black xsm:text-base">
                  {{ badgeStore.badge.times_achieved }}回
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
