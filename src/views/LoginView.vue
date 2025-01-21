<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

async function login() {
  console.log('execute')
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        健康管理APP
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="bg-white p-10 rounded shadow border border-gray-200">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900"
              >メールアドレス</label
            >
            <div class="mt-2">
              <input
                id="email"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                v-model="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm/6 font-medium text-gray-900"
                >パスワード</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                v-model="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
