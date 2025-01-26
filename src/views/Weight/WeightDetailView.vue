<script setup>
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>WeightDetail</h2>
  <p><RouterLink :to="{ name: 'weightList' }">一覧ページへ</RouterLink></p>
  <MainFooter />
</template>
