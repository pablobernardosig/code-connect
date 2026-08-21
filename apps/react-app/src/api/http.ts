import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getToken } from '../auth/token.ts'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

export function attachAuthToken(config: InternalAxiosRequestConfig) {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

http.interceptors.request.use(attachAuthToken)
