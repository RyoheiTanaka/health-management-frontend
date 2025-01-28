<script setup>
import { ref, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import { getBadgeListApi } from '@/apis/FitbitLog'
import { groupBy } from '@/utils/format'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const carouselConfig = {
  itemsToScroll: 4,
  itemsToShow: 4,
}

const badges = ref({})
const categorybadges = ref({})

onBeforeMount(async () => {
  badges.value = await getBadgeListApi()
  categorybadges.value = groupBy(badges.value, 'category')
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッチ</h2>
      <div class="py-12 m-0 mx-auto" v-for="(categorybadge, index) in categorybadges" :key="index">
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
    </div>
  </section>
</template>
