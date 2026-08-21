import { describe, expect, it } from 'vitest'
import { clearToken, getToken, setToken } from './token.ts'

describe('token storage', () => {
  it('persiste no localStorage quando remember é true', () => {
    setToken('jwt-local', true)

    expect(localStorage.getItem('code-connect.access_token')).toBe('jwt-local')
    expect(sessionStorage.getItem('code-connect.access_token')).toBeNull()
    expect(getToken()).toBe('jwt-local')
  })

  it('persiste no sessionStorage quando remember é false', () => {
    setToken('jwt-session', false)

    expect(sessionStorage.getItem('code-connect.access_token')).toBe('jwt-session')
    expect(localStorage.getItem('code-connect.access_token')).toBeNull()
    expect(getToken()).toBe('jwt-session')
  })

  it('remove o token dos dois storages', () => {
    localStorage.setItem('code-connect.access_token', 'jwt-local')
    sessionStorage.setItem('code-connect.access_token', 'jwt-session')
    clearToken()

    expect(getToken()).toBeNull()
    expect(localStorage.getItem('code-connect.access_token')).toBeNull()
    expect(sessionStorage.getItem('code-connect.access_token')).toBeNull()
  })
})
