import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authStorage } from '@/services/auth/storage'
import { storage } from '@/shared/constants'

describe('authStorage', () => {
  const auth = {
    user: {
      id: 'user-1',
      email: 'test@example.com',
      name: '',
      avatar: '',
    },
    token: 'test-token',
  }

  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('get', () => {
    it('should return null when window is unavailable', () => {
      const windowSpy = vi
        .spyOn(globalThis, 'window', 'get')
        .mockReturnValue(undefined as unknown as Window & typeof globalThis)

      expect(authStorage.get()).toBeNull()

      windowSpy.mockRestore()
    })

    it('should return null when auth data does not exist', () => {
      expect(authStorage.get()).toBeNull()
    })

    it('should return stored authentication data', () => {
      window.localStorage.setItem(storage.auth, JSON.stringify(auth))

      expect(authStorage.get()).toEqual(auth)
    })

    it('should return null when stored value is empty', () => {
      window.localStorage.setItem(storage.auth, '')

      expect(authStorage.get()).toBeNull()
    })

    it('should clear corrupted authentication data', () => {
      window.localStorage.setItem(storage.auth, '{invalid-json')

      expect(authStorage.get()).toBeNull()
      expect(window.localStorage.getItem(storage.auth)).toBeNull()
    })
  })

  describe('set', () => {
    it('should do nothing when window is unavailable', () => {
      const windowSpy = vi
        .spyOn(globalThis, 'window', 'get')
        .mockReturnValue(undefined as unknown as Window & typeof globalThis)

      expect(() => authStorage.set(auth)).not.toThrow()

      windowSpy.mockRestore()
    })

    it('should store authentication data', () => {
      authStorage.set(auth)

      expect(window.localStorage.getItem(storage.auth)).toBe(JSON.stringify(auth))
    })

    it('should overwrite existing authentication data', () => {
      const previousAuth = {
        ...auth,
        token: 'old-token',
      }

      authStorage.set(previousAuth)
      authStorage.set(auth)

      expect(authStorage.get()).toEqual(auth)
    })
  })

  describe('clear', () => {
    it('should do nothing when window is unavailable', () => {
      const windowSpy = vi
        .spyOn(globalThis, 'window', 'get')
        .mockReturnValue(undefined as unknown as Window & typeof globalThis)

      expect(() => authStorage.clear()).not.toThrow()

      windowSpy.mockRestore()
    })

    it('should clear stored authentication data', () => {
      authStorage.set(auth)

      expect(authStorage.get()).toEqual(auth)

      authStorage.clear()

      expect(window.localStorage.getItem(storage.auth)).toBeNull()
      expect(authStorage.get()).toBeNull()
    })

    it('should not throw when auth data does not exist', () => {
      expect(() => authStorage.clear()).not.toThrow()
    })
  })
})
