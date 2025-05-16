import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSleepListApi } from '@/apis/FitbitLog'
import { Sleep } from '@/types/Sleep'

export const useSleepStore = defineStore('sleep', () => {
  const sleepList = ref<Sleep[]>([])
  const sleep = ref<Sleep | null>(null)
  const isLoading = ref(false)

  const getSleepList = async () => {
    isLoading.value = true
    try {
      const data = await getSleepListApi()
      setSleepList(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const getSelectedSleep = async (id: number) => {
    isLoading.value = true
    sleep.value = null
    const findValue = id
    try {
      if (sleepList.value.length === 0) {
        const listData = await getSleepListApi()
        setSleepList(listData)
      }
      const data = sleepList.value.find(({ id }) => id == findValue) ?? null
      setSelectedSleep(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setSleepList = (data: Sleep[]) => {
    sleepList.value = data
  }

  const setSelectedSleep = (data: Sleep | null) => {
    sleep.value = data
  }

  return {
    sleepList,
    sleep,
    isLoading,
    getSleepList,
    getSelectedSleep,
    setSleepList,
    setSelectedSleep,
  }
})
