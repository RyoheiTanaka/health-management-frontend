<script setup>
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
import DashboardBadge from '@/components/DashboardBdge.vue'
import DashboardWeight from '@/components/DashboardWeight.vue'
import DashboardFat from '@/components/DashboardFat.vue'
import DashboardSleep from '@/components/DashboardSleep.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
</script>

<template>
  <MainHeader />
  <DashboardBadge />
  <DashboardWeight />
  <DashboardFat />
  <DashboardSleep />
  <MainFooter />
  <LoadingSpinner />
</template>
