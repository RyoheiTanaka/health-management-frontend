<script setup>
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
import DashboardBadge from '@/components/Dashboard/DashboardBdge.vue'
import DashboardWeight from '@/components/Dashboard/DashboardWeight.vue'
import DashboardFat from '@/components/Dashboard/DashboardFat.vue'
import DashboardSleep from '@/components/Dashboard/DashboardSleep.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
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
