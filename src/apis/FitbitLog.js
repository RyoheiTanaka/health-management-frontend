import axios from 'axios'

export const getDashboardBadgeListApi = async () => {
  try {
    const res = await axios.get('/backend/fitbit/badges', { params: { is_dashboard: true } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getBadgeListApi = async () => {
  try {
    const res = await axios.get('/backend/fitbit/badges', { params: { is_dashboard: false } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getBadgeApi = async (id) => {
  try {
    const res = await axios.get(`/backend/fitbit/badges/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getDashboardFatList = async () => {
  try {
    const res = await axios.get('/backend/fitbit/fats', { params: { is_dashboard: true } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getFatListApi = async () => {
  try {
    const res = await axios.get('/backend/fitbit/fats', { params: { is_dashboard: false } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getFatApi = async (id) => {
  try {
    const res = await axios.get(`/backend/fitbit/fats/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getDashboardSleepList = async () => {
  try {
    const res = await axios.get('/backend/fitbit/sleeps')
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getDashboardWeightList = async () => {
  try {
    const res = await axios.get('/backend/fitbit/weights', { params: { is_dashboard: true } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getWeightListApi = async () => {
  try {
    const res = await axios.get('/backend/fitbit/weights', { params: { is_dashboard: false } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getWeightApi = async (id) => {
  try {
    const res = await axios.get(`/backend/fitbit/weights/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
