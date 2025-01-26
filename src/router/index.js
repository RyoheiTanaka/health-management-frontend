import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'login',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/badge',
      name: 'badgeList',
      component: () => import('../views/Badge/BadgeListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/badge/:id',
      name: 'badgeDetail',
      component: () => import('../views/Badge/BadgeDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/weight',
      name: 'weightList',
      component: () => import('../views/Weight/WeightListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/weight/:id',
      name: 'weightDetail',
      component: () => import('../views/Weight/WeightDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/fat',
      name: 'fatList',
      component: () => import('../views/Fat/FatListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/fat/:id',
      name: 'fatDetail',
      component: () => import('../views/Fat/FatDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/sleep',
      name: 'sleepList',
      component: () => import('../views/Sleep/SleepListView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/sleep/:id',
      name: 'sleepDetail',
      component: () => import('../views/Sleep/SleepDetailView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
    await authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && authStore.isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
