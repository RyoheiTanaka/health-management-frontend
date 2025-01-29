import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBadgeApi, getBadgeListApi } from '@/apis/FitbitLog'

export const useBadgeStore = defineStore('badge', () => {
  const cache = ref(new Map())
  const badgeList = ref([])
  const badge = ref(null)
  const isLoading = ref(false)

  const getBadgeList = async () => {
    isLoading.value = true
    try {
      const data = await getBadgeListApi()
      setBadgeList(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const getSelectedBadge = async (id) => {
    if (!id) return
    if (cache.value.has(id)) {
      badge.value = cache.value.get(id)
      return
    }
    isLoading.value = true
    badge.value = null
    try {
      const data = await getBadgeApi(id)
      setSelectedBadge(data)
      cache.value.set(id, data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setBadgeList = (data) => {
    badgeList.value = data
  }

  const setSelectedBadge = (data) => {
    badge.value = data
  }

  return {
    badgeList,
    badge,
    isLoading,
    getBadgeList,
    getSelectedBadge,
    setBadgeList,
    setSelectedBadge,
  }
})
