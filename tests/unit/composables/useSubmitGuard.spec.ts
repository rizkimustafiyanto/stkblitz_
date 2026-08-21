import { describe, expect, it } from 'vitest'

import { useSubmitGuard } from '@/composables/useSubmitGuard'

describe('useSubmitGuard', () => {
  it('should initialize with loading false', () => {
    const { loading } = useSubmitGuard()

    expect(loading.value).toBe(false)
  })

  it('should execute the provided function', async () => {
    const { wrap } = useSubmitGuard()

    let executed = false

    await wrap(async () => {
      executed = true
    })

    expect(executed).toBe(true)
  })

  it('should return the result from the provided function', async () => {
    const { wrap } = useSubmitGuard()

    const result = await wrap(async () => {
      return {
        success: true,
      }
    })

    expect(result).toEqual({
      success: true,
    })
  })

  it('should set loading to true while the function is running', async () => {
    const { loading, wrap } = useSubmitGuard()

    let resolvePromise!: () => void

    const promise = wrap(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve
        }),
    )

    expect(loading.value).toBe(true)

    resolvePromise()

    await promise

    expect(loading.value).toBe(false)
  })

  it('should reject when already loading', async () => {
    const { wrap } = useSubmitGuard()

    let resolvePromise!: () => void

    const firstRequest = wrap(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve
        }),
    )

    await expect(
      wrap(async () => {
        return 'second request'
      }),
    ).rejects.toThrow('Already loading')

    resolvePromise()

    await firstRequest
  })

  it('should reset loading when the function rejects', async () => {
    const { loading, wrap } = useSubmitGuard()

    const request = wrap(async () => {
      throw new Error('Request failed')
    })

    expect(loading.value).toBe(true)

    await expect(request).rejects.toThrow('Request failed')

    expect(loading.value).toBe(false)
  })

  it('should allow another submission after the first one finishes', async () => {
    const { loading, wrap } = useSubmitGuard()

    const firstResult = await wrap(async () => {
      return 'first'
    })

    expect(firstResult).toBe('first')
    expect(loading.value).toBe(false)

    const secondResult = await wrap(async () => {
      return 'second'
    })

    expect(secondResult).toBe('second')
    expect(loading.value).toBe(false)
  })
})
