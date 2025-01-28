<script setup>
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>WeightDetail</h2>
  <p><RouterLink :to="{ name: 'weightList' }">一覧ページへ</RouterLink></p>
  <MainFooter />
</template>
