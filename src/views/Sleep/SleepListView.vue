<script setup>
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
import SleepList from '@/components/Sleep/SleepList.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
</script>

<template>
  <MainHeader />
  <SleepList />
  <MainFooter />
  <LoadingSpinner />
</template>
