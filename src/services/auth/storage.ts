import { storage } from '@/shared/constants'
import type { User } from '@/types'

export type StoredAuth = {
  user: User
  token: string
}

export const authStorage = {
  get(): StoredAuth | null {
    if (typeof window === 'undefined') {
      return null
    }

    const value = window.localStorage.getItem(storage.auth)

    if (!value) {
      return null
    }

    try {
      return JSON.parse(value) as StoredAuth
    } catch {
      this.clear()
      return null
    }
  },

  set(auth: StoredAuth): void {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(storage.auth, JSON.stringify(auth))
  },

  clear(): void {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.removeItem(storage.auth)
  },
}
