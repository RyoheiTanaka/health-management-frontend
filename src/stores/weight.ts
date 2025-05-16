import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getWeightListApi } from '@/apis/FitbitLog'
import { Weight } from '@/types/Weight'

export const useWeightStore = defineStore('weight', () => {
  const weightList = ref<Weight[]>([])
  const weight = ref<Weight | null>(null)
  const isLoading = ref(false)

  const getWeightList = async () => {
    isLoading.value = true
    try {
      const data = await getWeightListApi()
      setWeightList(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const getSelectedWeight = async (id: number) => {
    isLoading.value = true
    weight.value = null
    const findValue = id
    try {
      if (weightList.value.length === 0) {
        const listData = await getWeightListApi()
        setWeightList(listData)
      }
      const data = weightList.value.find(({ id }) => id == findValue) ?? null
      setSelectedWeight(data)
    } catch (e) {
      console.error('データ取得エラー:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setWeightList = (data: Weight[]) => {
    weightList.value = data
  }

  const setSelectedWeight = (data: Weight | null) => {
    weight.value = data
  }

  return {
    weightList,
    weight,
    isLoading,
    getWeightList,
    getSelectedWeight,
    setWeightList,
    setSelectedWeight,
  }
})
