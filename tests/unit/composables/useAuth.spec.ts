import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuth } from '@/composables/useAuth'

const { mockPush, mockLogin, mockLogout, mockValidate, mockErrors } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockLogin: vi.fn(),
  mockLogout: vi.fn(),
  mockValidate: vi.fn(),
  mockErrors: {
    value: {},
  } as { value: Record<string, string> },
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    login: mockLogin,
    logout: mockLogout,
  }),
}))

vi.mock('@/composables/useZodForm', () => ({
  useZodForm: () => ({
    errors: mockErrors,
    validate: mockValidate,
  }),
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockErrors.value = {}
  })

  describe('login', () => {
    it('returns true and redirects to home when login succeeds', async () => {
      mockValidate.mockReturnValue(true)
      mockLogin.mockResolvedValue(undefined)
      mockPush.mockResolvedValue(undefined)

      const { login } = useAuth()

      const payload = {
        email: 'user@example.com',
        password: 'password123',
      }

      const result = await login(payload)

      expect(result).toBe(true)

      expect(mockValidate).toHaveBeenCalledTimes(1)
      expect(mockValidate).toHaveBeenCalledWith(payload, expect.anything())

      expect(mockLogin).toHaveBeenCalledTimes(1)
      expect(mockLogin).toHaveBeenCalledWith(payload)

      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith({
        name: 'home',
      })
    })

    it('returns false and does not login when validation fails', async () => {
      mockValidate.mockReturnValue(false)

      const { login } = useAuth()

      const payload = {
        email: 'invalid-email',
        password: '',
      }

      const result = await login(payload)

      expect(result).toBe(false)

      expect(mockValidate).toHaveBeenCalledTimes(1)
      expect(mockValidate).toHaveBeenCalledWith(payload, expect.anything())

      expect(mockLogin).not.toHaveBeenCalled()
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('returns false when store login throws an error', async () => {
      mockValidate.mockReturnValue(true)
      mockLogin.mockRejectedValue(new Error('Invalid credentials'))

      const { login } = useAuth()

      const payload = {
        email: 'user@example.com',
        password: 'wrong-password',
      }

      const result = await login(payload)

      expect(result).toBe(false)

      expect(mockValidate).toHaveBeenCalledTimes(1)
      expect(mockLogin).toHaveBeenCalledTimes(1)
      expect(mockLogin).toHaveBeenCalledWith(payload)

      expect(mockPush).not.toHaveBeenCalled()
    })

    it('returns false when router redirect throws an error', async () => {
      mockValidate.mockReturnValue(true)
      mockLogin.mockResolvedValue(undefined)
      mockPush.mockRejectedValue(new Error('Navigation failed'))

      const { login } = useAuth()

      const payload = {
        email: 'user@example.com',
        password: 'password123',
      }

      const result = await login(payload)

      expect(result).toBe(false)

      expect(mockValidate).toHaveBeenCalledTimes(1)
      expect(mockLogin).toHaveBeenCalledTimes(1)

      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith({
        name: 'home',
      })
    })
  })

  describe('logout', () => {
    it('logs out and redirects to login by default', async () => {
      mockLogout.mockResolvedValue(undefined)
      mockPush.mockResolvedValue(undefined)

      const { logout } = useAuth()

      await logout()

      expect(mockLogout).toHaveBeenCalledTimes(1)

      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith({
        name: 'login',
      })
    })

    it('logs out without redirect when redirect is false', async () => {
      mockLogout.mockResolvedValue(undefined)

      const { logout } = useAuth()

      await logout(false)

      expect(mockLogout).toHaveBeenCalledTimes(1)
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('propagates logout error', async () => {
      mockLogout.mockRejectedValue(new Error('Logout failed'))

      const { logout } = useAuth()

      await expect(logout()).rejects.toThrow('Logout failed')

      expect(mockLogout).toHaveBeenCalledTimes(1)
      expect(mockPush).not.toHaveBeenCalled()
    })
  })

  describe('errors', () => {
    it('returns errors from useZodForm', () => {
      mockErrors.value = {
        email: 'Email is required',
        password: 'Password is required',
      }

      const { errors } = useAuth()

      expect(errors).toBe(mockErrors)

      expect(errors.value).toEqual({
        email: 'Email is required',
        password: 'Password is required',
      })
    })
  })
})
