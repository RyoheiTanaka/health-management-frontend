import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BadgeListView from '@/views/Badge/BadgeListView.vue'
import BadgeDetailView from '@/views/Badge/BadgeDetailView.vue'
import FatListView from '@/views/Fat/FatListView.vue'
import FatDetailView from '@/views/Fat/FatDetailView.vue'
import SleepListView from '@/views/Sleep/SleepListView.vue'
import SleepDetailView from '@/views/Sleep/SleepDetailView.vue'
import WeightListView from '@/views/Weight/WeightListView.vue'
import WeightDetailView from '@/views/Weight/WeightDetailView.vue'
import DashboardView from '@/views/DashboardView.vue'
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
      component: DashboardView,
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
      component: BadgeListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/badge/:id',
      name: 'badgeDetail',
      component: BadgeDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/weight',
      name: 'weightList',
      component: WeightListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/weight/:id',
      name: 'weightDetail',
      component: WeightDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/fat',
      name: 'fatList',
      component: FatListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/fat/:id',
      name: 'fatDetail',
      component: FatDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sleep',
      name: 'sleepList',
      component: SleepListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/sleep/:id',
      name: 'sleepDetail',
      component: SleepDetailView,
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
