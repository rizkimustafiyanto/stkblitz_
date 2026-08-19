import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/home/HomePage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import ChatDetailPage from '@/pages/chat/ChatDetailPage.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/chats/:id',
      name: 'chat-detail',
      component: ChatDetailPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login' }
  }

  if (to.name === 'login' && auth.isLoggedIn) {
    return { name: 'home' }
  }

  return true
})

export default router
