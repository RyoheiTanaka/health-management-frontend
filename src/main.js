import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './styles/tailwind.css'

// Axiosのデフォルト設定
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const app = createApp(App)

app.use(router)

app.mount('#app')
