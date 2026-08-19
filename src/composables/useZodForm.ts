import { ref } from 'vue'

type SchemaLike<T> = {
  safeParse: (value: unknown) =>
    | { success: true; data: T }
    | {
        success: false
        error: { issues: Array<{ path: Array<string | number>; message: string }> }
      }
}

export function useZodForm() {
  const errors = ref<Record<string, string>>({})

  const clearErrors = (): void => {
    errors.value = {}
  }

  const validate = <T>(data: unknown, schema: SchemaLike<T>): boolean => {
    clearErrors()

    const result = schema.safeParse(data)

    if (result.success) {
      return true
    }

    const nextErrors: Record<string, string> = {}

    for (const issue of result.error.issues) {
      const field = issue.path.join('.')

      if (field && !(field in nextErrors)) {
        nextErrors[field] = issue.message
      }
    }

    errors.value = nextErrors

    return false
  }

  return {
    errors,
    validate,
    clearErrors,
  }
}
