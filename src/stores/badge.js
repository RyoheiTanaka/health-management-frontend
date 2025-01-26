import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getDashboardBadgeListApi, getBadgeListApi, getBadgeApi } from '@/apis/FitbitLog'
import { groupBy } from '@/utils/format'

export const useBadgeStore = defineStore('badge', () => {
  const isFetched = ref(false)
  const dashboradBadgeList = ref({})
  const badgeList = ref({})
  const badge = ref({})

  async function getDashboardBadgeList() {
    try {
      isFetched.value = false
      dashboradBadgeList.value = await getDashboardBadgeListApi()
    } catch (error) {
      console.log(error)
    } finally {
      isFetched.value = true
    }
  }

  async function getBadgeList() {
    try {
      isFetched.value = false
      const response = await getBadgeListApi()
      badgeList.value = groupBy(response, 'category')
    } catch (error) {
      console.log(error)
    } finally {
      isFetched.value = true
    }
  }

  async function getBadge(id) {
    try {
      isFetched.value = false
      badge.value = await getBadgeApi(id)
    } catch (error) {
      console.log(error)
    } finally {
      isFetched.value = true
    }
  }

  return {
    isFetched,
    dashboradBadgeList,
    badgeList,
    badge,
    getDashboardBadgeList,
    getBadgeList,
    getBadge,
  }
})
