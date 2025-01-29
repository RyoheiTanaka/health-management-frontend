<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { groupBy } from '@/utils/format'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'
import { useBadgeStore } from '@/stores/badge'

const badgeStore = useBadgeStore()
const categorybadges = computed(() => groupBy(badgeStore.badgeList, 'category'))

const carouselConfig = {
  itemsToScroll: 4,
  itemsToShow: 4,
}

onMounted(async () => {
  if (badgeStore.badgeList.length === 0) {
    await badgeStore.getBadgeList()
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッチ</h2>
      <div v-if="badgeStore.isLoading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div
          class="py-12 m-0 mx-auto"
          v-for="(categorybadge, index) in categorybadges"
          :key="index"
        >
          <h3 class="pb-5 text-lg font-bold">{{ index }}</h3>
          <Carousel v-bind="carouselConfig">
            <Slide v-for="badge in categorybadge" :key="badge.id">
              <div class="carousel__item min-h-40">
                <RouterLink :to="{ name: 'badgeDetail', params: { id: badge.id } }">
                  <div class="mb-5">
                    <img :src="badge.image125px" />
                  </div>
                  <p class="text-center">{{ badge.short_name }}</p>
                </RouterLink>
              </div>
            </Slide>
            <template #addons="{ slidesCount }">
              <Navigation v-if="slidesCount > 1" />
            </template>
          </Carousel>
        </div>
        <div class="text-right mt-4">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-base underline text-blue-500 hover:opacity-50"
          >
            back to Dashboard
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
