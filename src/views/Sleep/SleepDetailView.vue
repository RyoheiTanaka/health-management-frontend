<script setup>
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>SleepDetail</h2>
  <p><RouterLink :to="{ name: 'sleepList' }">一覧ページへ</RouterLink></p>
  <MainFooter />
</template>
