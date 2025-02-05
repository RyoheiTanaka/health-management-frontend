import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFatListApi } from '@/apis/FitbitLog'

export const useFatStore = defineStore('fat', () => {
  const fatList = ref([])
  const fat = ref(null)
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

  const getSelectedFat = async (id) => {
    isLoading.value = true
    fat.value = null
    const findValue = id
    try {
      if (fatList.value.length === 0) {
        const listData = await getFatListApi()
        setFatList(listData)
      }
      const data = fatList.value.find(({ id }) => id == findValue)
      setSelectedFat(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setFatList = (data) => {
    fatList.value = data
  }

  const setSelectedFat = (data) => {
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
