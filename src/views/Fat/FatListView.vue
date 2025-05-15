<script setup lang="ts">
import MainHeader from '@/components/Common/MainHeader.vue'
import MainFooter from '@/components/Common/MainFooter.vue'
import FatList from '@/components/Fat/FatList.vue'
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue'
</script>

<template>
  <MainHeader />
  <FatList />
  <MainFooter />
  <LoadingSpinner />
</template>
