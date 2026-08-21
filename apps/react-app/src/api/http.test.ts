import { beforeEach, describe, expect, it } from 'vitest'
import { AxiosHeaders } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { attachAuthToken } from './http.ts'
import { clearToken, setToken } from '../auth/token.ts'

describe('attachAuthToken', () => {
  beforeEach(() => {
    clearToken()
  })

  it('anexa o Bearer token quando autenticado', () => {
    setToken('jwt-token', true)

    const config = {
      headers: new AxiosHeaders(),
    } as InternalAxiosRequestConfig

    expect(attachAuthToken(config).headers.Authorization).toBe('Bearer jwt-token')
  })

  it('não altera os headers quando não há token', () => {
    const config = {
      headers: new AxiosHeaders(),
    } as InternalAxiosRequestConfig

    expect(attachAuthToken(config).headers.Authorization).toBeUndefined()
  })
})
