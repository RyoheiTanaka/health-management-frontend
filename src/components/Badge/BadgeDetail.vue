<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useBadgeStore } from '@/stores/badge'

const route = useRoute()
const badgeStore = useBadgeStore()

const prevId = ref(null)

const badge = computed(() => badgeStore.badge)

watchEffect(() => {
  const newId = route.params.id
  if (newId && newId !== prevId.value) {
    badgeStore.getSelectedBadge(newId)
    prevId.value = newId
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッジ</h2>
      <div v-if="badgeStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else-if="badge">
        <div class="flex flex-col justify-normal lg:flex-row lg:justify-between">
          <div class="m-0 mx-auto pb-8 lg:pb-0">
            <img :src="badge.image300px" :alt="badge.short_name" />
          </div>
          <div class="lg:w-[50%]">
            <div class="flex flex-col">
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">名称</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-black xsm:text-base">
                    {{ badge.short_name }}
                  </h3>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">カテゴリー</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-black xsm:text-base">
                    {{ badge.category }}
                  </h3>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">バッジタイプ</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-black xsm:text-base break-words">
                    {{ badge.badge_type }}
                  </h3>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">説明</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-black xsm:text-base">
                    {{ badge.description }}
                  </h3>
                </div>
              </div>
              <div class="grid grid-cols-2 rounded-sm border-b border-stroke">
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-gray-500 xsm:text-base">取得回数</h3>
                </div>
                <div class="p-2.5 xl:p-5">
                  <h3 class="text-sm font-medium text-black xsm:text-base">
                    {{ badge.times_achieved }}回
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'badgeList' }"
            class="text-base underline text-blue-500 hover:opacity-50"
            >back to Badge List</RouterLink
          >
        </div>
      </div>
      <div v-else>データが見つかりません</div>
    </div>
  </section>
</template>
