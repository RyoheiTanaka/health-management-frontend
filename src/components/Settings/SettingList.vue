<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const isConnected = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const route = useRoute()
const router = useRouter()

// Fitbit連携ボタン押下時
const connectFitbit = async () => {
  isLoading.value = true
  window.location.href = `${import.meta.env.VITE_API_URL}/fitbit/auth`
}

// ページマウント時
onMounted(() => {
  const fitbitStatus = route.query.fitbit

  if (fitbitStatus === 'connected') {
    isConnected.value = true
    router.replace({ query: {} })
  }
})
</script>

<template>
  <section class="px-6 py-12 lg:px-8">
    <div class="bg-white p-10 rounded shadow border border-gray-200 min-h-60">
      <h2 class="text-xl font-bold mb-4">ユーザー設定</h2>
      <button
        @click="connectFitbit"
        :disabled="isLoading"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        <template v-if="isLoading">
          <svg class="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
            ></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          連携中
        </template>
        <template v-else> Fitbitと連携する </template>
      </button>

      <div v-if="isConnected" class="mt-4 text-green-500 font-bold">Fitbit連携済み！</div>

      <div v-if="errorMessage" class="mt-4 text-red-500">エラー: {{ errorMessage }}</div>
    </div>
  </section>
</template>
