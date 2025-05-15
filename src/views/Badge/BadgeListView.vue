<script setup lang="ts">
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
import BadgeList from '@/components/Badge/BadgeList.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
</script>

<template>
  <MainHeader />
  <BadgeList />
  <MainFooter />
  <LoadingSpinner />
</template>
