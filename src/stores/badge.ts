import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBadgeListApi } from '@/apis/FitbitLog'
import { Badge } from '@/types/Badge'

export const useBadgeStore = defineStore('badge', () => {
  const badgeList = ref<Badge[]>([])
  const badge = ref<Badge | null>(null)
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

  const getSelectedBadge = async (id: number) => {
    isLoading.value = true
    badge.value = null
    const findValue = id
    try {
      if (badgeList.value.length === 0) {
        const listData = await getBadgeListApi()
        setBadgeList(listData)
      }
      const data = badgeList.value.find(({ id }) => id == findValue) ?? null
      setSelectedBadge(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setBadgeList = (data: Badge[]) => {
    badgeList.value = data
  }

  const setSelectedBadge = (data: Badge | null) => {
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
