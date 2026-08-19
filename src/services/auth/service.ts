import type { User, LoginPayload, LoginResponse } from '@/types/auth'
import { client } from '../http'
import { generateUserAvatar, toTitleCaseFromEmail } from '@/shared/utils'

export const authService = () => {
  return {
    login(payload: LoginPayload) {
      // return client.post<LoginResponse>('/auth/login', payload)
      return {
        data: {
          token: '',
          user: {
            email: payload.email,
            name: toTitleCaseFromEmail(payload.email),
            avatar: generateUserAvatar(payload.email),
          },
        },
      }
    },

    logout() {
      // return client.post('/auth/logout')
      return true
    },

    me() {
      return client.get<User>('/auth/me')
    },
  }
}
