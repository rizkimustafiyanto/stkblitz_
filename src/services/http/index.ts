import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const client = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.get<T>(url, config)
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.post<T>(url, data, config)
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.put<T>(url, data, config)
  },

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.patch<T>(url, data, config)
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return http.delete<T>(url, config)
  },

  upload<T>(
    url: string,
    data: Record<string, unknown>,
    files?: Record<string, File | File[]>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return
      }

      if (value instanceof Blob) {
        formData.append(key, value)
        return
      }

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, String(item))
        })
        return
      }

      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
        return
      }

      formData.append(key, String(value))
    })

    Object.entries(files ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file)
        })

        return
      }

      formData.append(key, value)
    })

    return http.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
