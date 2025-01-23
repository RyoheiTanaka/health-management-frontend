import axios from 'axios'

// Axiosのデフォルト設定
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true
