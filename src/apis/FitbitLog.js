import axios from 'axios'

export const getDashboardbadgeList = async () => {
  try {
    const res = await axios.get('/api/fitbit/badges', { params: { is_dashboard: true } })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getDashboardFatList = async () => {
  try {
    const res = await axios.get('/api/fitbit/fats')
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
