import type { LoginPayload } from '@/types'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

import { useZodForm } from './useZodForm'
import { loginSchema } from '@/schemas/auth-schema'
import { useAuthStore } from '@/stores/auth'

type UseAuthReturn = {
  login: (payload: LoginPayload) => Promise<boolean>
  logout: (redirect?: boolean) => Promise<void>
  errors: Ref<Record<string, string>>
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter()
  const store = useAuthStore()

  const { errors, validate } = useZodForm()

  const login = async (payload: LoginPayload): Promise<boolean> => {
    if (!validate(payload, loginSchema)) {
      return false
    }

    try {
      await store.login(payload)

      await router.push({ name: 'home' })

      return true
    } catch {
      return false
    }
  }

  const logout = async (redirect = true): Promise<void> => {
    await store.logout()

    if (redirect) {
      await router.push({ name: 'login' })
    }
  }

  return {
    login,
    logout,
    errors,
  }
}
