<script setup>
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>SleepDetail</h2>
  <p><RouterLink :to="{ name: 'sleepList' }">一覧ページへ</RouterLink></p>
  <MainFooter />
</template>
