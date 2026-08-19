import { defineStore } from 'pinia'

import type { LoginPayload, User } from '@/types'

import { authService, authStorage } from '@/services'

type AuthState = {
  user: User | null
  token: string | null
  authChecked: boolean
}

const service = authService()

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    authChecked: false,
  }),

  getters: {
    isLoggedIn: (state): boolean => {
      return state.user !== null
    },
  },

  actions: {
    initialize(): void {
      const auth = authStorage.get()

      this.user = auth?.user ?? null
      this.token = auth?.token ?? null
      this.authChecked = true
    },

    async login(payload: LoginPayload): Promise<void> {
      const { data } = await service.login(payload)

      this.user = data.user
      this.token = data.token

      authStorage.set({
        user: data.user,
        token: data.token,
      })

      this.authChecked = true
    },

    async logout(): Promise<void> {
      try {
        await service.logout()
      } finally {
        this.user = null
        this.token = null
        this.authChecked = true

        authStorage.clear()
      }
    },
  },
})
