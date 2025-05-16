import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFatListApi } from '@/apis/FitbitLog'
import { Fat } from '@/types/Fat'

export const useFatStore = defineStore('fat', () => {
  const fatList = ref<Fat[]>([])
  const fat = ref<Fat | null>(null)
  const isLoading = ref(false)

  const getFatList = async () => {
    isLoading.value = true
    try {
      const data = await getFatListApi()
      setFatList(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const getSelectedFat = async (id: number) => {
    isLoading.value = true
    fat.value = null
    const findValue = id
    try {
      if (fatList.value.length === 0) {
        const listData = await getFatListApi()
        setFatList(listData)
      }
      const data = fatList.value.find(({ id }) => id == findValue) ?? null
      setSelectedFat(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setFatList = (data: Fat[]) => {
    fatList.value = data
  }

  const setSelectedFat = (data: Fat | null) => {
    fat.value = data
  }

  return {
    fatList,
    fat,
    isLoading,
    getFatList,
    getSelectedFat,
    setFatList,
    setSelectedFat,
  }
})
