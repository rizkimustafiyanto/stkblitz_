import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

type AuthUser = {
  email: string
  name: string
  avatar: string
}

function toTitleCaseFromEmail(email: string) {
  const localPart = email.split('@')[0] ?? ''
  return localPart
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)

  const isLoggedIn = computed(() => user.value !== null)

  function login(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      return false
    }

    user.value = {
      email,
      name: toTitleCaseFromEmail(email),
      avatar: `https://randomuser.me/api/portraits/lego/${Math.abs(email.length * 13) % 10}.jpg`,
    }

    return true
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
