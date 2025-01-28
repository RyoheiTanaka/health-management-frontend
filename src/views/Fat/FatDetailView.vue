<script setup>
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>FatDetail</h2>
  <p><RouterLink :to="{ name: 'fatList' }">一覧ページへ</RouterLink></p>
  <MainFooter />
</template>
