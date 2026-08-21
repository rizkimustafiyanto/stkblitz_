import { describe, expect, it } from 'vitest'
import { z } from 'zod'

import { useZodForm } from '@/composables/useZodForm'

describe('useZodForm', () => {
  it('should return true when data is valid', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      email: z.email(),
    })

    const result = validate(
      {
        email: 'test@example.com',
      },
      schema,
    )

    expect(result).toBe(true)
    expect(errors.value).toEqual({})
  })

  it('should return false when data is invalid', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      email: z.email(),
    })

    const result = validate(
      {
        email: 'invalid-email',
      },
      schema,
    )

    expect(result).toBe(false)
    expect(errors.value.email).toBeDefined()
  })

  it('should store the validation error message', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      email: z.email(),
    })

    validate(
      {
        email: 'invalid-email',
      },
      schema,
    )

    expect(errors.value.email).toBeDefined()
    expect(typeof errors.value.email).toBe('string')
  })

  it('should clear all validation errors', () => {
    const { errors, validate, clearErrors } = useZodForm()

    const schema = z.object({
      email: z.email(),
    })

    validate(
      {
        email: 'invalid-email',
      },
      schema,
    )

    expect(errors.value.email).toBeDefined()

    clearErrors()

    expect(errors.value).toEqual({})
  })

  it('should clear previous errors before validating again', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      email: z.email(),
    })

    const invalidResult = validate(
      {
        email: 'invalid-email',
      },
      schema,
    )

    expect(invalidResult).toBe(false)
    expect(errors.value.email).toBeDefined()

    const validResult = validate(
      {
        email: 'test@example.com',
      },
      schema,
    )

    expect(validResult).toBe(true)
    expect(errors.value).toEqual({})
  })

  it('should store errors for multiple fields', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      email: z.email(),
      password: z.string().min(8),
    })

    const result = validate(
      {
        email: 'invalid-email',
        password: '123',
      },
      schema,
    )

    expect(result).toBe(false)

    expect(errors.value.email).toBeDefined()
    expect(errors.value.password).toBeDefined()
  })

  it('should keep only the first error for the same field', () => {
    const { errors, validate } = useZodForm()

    const schema = z.object({
      username: z
        .string()
        .min(5, 'Username must be at least 5 characters')
        .regex(/^[a-z]+$/, 'Username must contain only lowercase letters'),
    })

    validate(
      {
        username: '123',
      },
      schema,
    )

    expect(errors.value.username).toBe('Username must be at least 5 characters')
  })
})
