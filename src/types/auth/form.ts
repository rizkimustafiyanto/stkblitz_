import type { User } from './user'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: User
}
