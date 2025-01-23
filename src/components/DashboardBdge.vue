<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const badges = ref({})
const fetchData = async () => {
  try {
    const res = await axios.get('/api/fitbit/badges', { params: { is_dashboard: true } })
    badges.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200">
      <h2 class="mb-8 text-xl font-bold text-black">獲得バッチ</h2>
      <div class="m-0 mx-auto">
        <ul class="flex justify-center">
          <li class="mx-2 xl:mx-8" v-for="badge in badges" :key="badge.name">
            <div class="mb-5">
              <img :src="badge.image125px" :alt="badge.description" />
            </div>
            <p class="text-center">{{ badge.short_name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
