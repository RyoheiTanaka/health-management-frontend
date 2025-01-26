<script setup>
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
</script>

<template>
  <MainHeader />
  <h2>FatList</h2>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 1 } }">詳細ページへ(id=1)</RouterLink>
  </p>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 2 } }">詳細ページへ(id=2)</RouterLink>
  </p>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 3 } }">詳細ページへ(id=3)</RouterLink>
  </p>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 4 } }">詳細ページへ(id=4)</RouterLink>
  </p>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 5 } }">詳細ページへ(id=5)</RouterLink>
  </p>
  <p>
    <RouterLink :to="{ name: 'fatDetail', params: { id: 6 } }">詳細ページへ(id=6)</RouterLink>
  </p>
  <MainFooter />
</template>
