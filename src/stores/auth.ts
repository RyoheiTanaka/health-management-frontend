import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const isLoggedIn = ref(false)

  const setIsLoading = (flg: boolean) => {
    isLoading.value = flg
  }

  const setIsLoggedIn = (flg: boolean) => {
    isLoggedIn.value = flg
  }

  const checkAuth = async () => {
    try {
      const response = await axios.get('/backend/auth/check')
      setIsLoggedIn(response.data.authenticated)
    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', { email, password })
      setIsLoggedIn(true)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoggedIn(false)
      return false
    }
  }

  const logout = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/logout')
      setIsLoggedIn(false)
      return true
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  }

  return {
    isLoading,
    isLoggedIn,
    setIsLoading,
    setIsLoggedIn,
    checkAuth,
    login,
    logout,
  }
})
