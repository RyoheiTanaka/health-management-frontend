import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/badge',
      name: 'badge',
      component: DashboardView,
    },
    {
      path: '/weight',
      name: 'weight',
      component: DashboardView,
    },
    {
      path: '/fat',
      name: 'fat',
      component: DashboardView,
    },
    {
      path: '/sleep',
      name: 'sleep',
      component: DashboardView,
    },
  ],
})

export default router
