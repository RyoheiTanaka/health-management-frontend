import axios from 'axios'

export const getDashboardbadgeList = async () => {
  try {
    const res = await axios.get('/backend/fitbit/badges', { params: { is_dashboard: true } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getDashboardFatList = async () => {
  try {
    const res = await axios.get('/backend/fitbit/fats')
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
    const res = await axios.get('/backend/fitbit/weights')
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
