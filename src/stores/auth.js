import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    async checkAuth() {
      try {
        const response = await axios.get('/api/auth/check')
        this.isLoggedIn = response.data.authenticated
      } catch (error) {
        console.log(error)
        this.isLoggedIn = false
      }
    },
    async login(email, password) {
      try {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/login', { email, password })
        this.isLoggedIn = true
      } catch (error) {
        console.error('Login failed:', error)
        this.isLoggedIn = false
      }
    },
    async logout() {
      try {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/logout')
        this.isLoggedIn = false
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
  },
})
