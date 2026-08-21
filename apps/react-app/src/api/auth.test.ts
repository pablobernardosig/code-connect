import { beforeEach, describe, expect, it, vi } from 'vitest'
import { http } from './http.ts'
import { login, register } from './auth.ts'

vi.mock('./http.ts', () => ({
  http: {
    post: vi.fn(),
  },
}))

const mockedPost = vi.mocked(http.post)

describe('auth api', () => {
  beforeEach(() => {
    mockedPost.mockReset()
  })

  it('envia POST /auth/login', async () => {
    mockedPost.mockResolvedValue({ data: { access_token: 'jwt-token' } })

    const payload = { email: 'ada@example.com', password: 'secret123' }
    await expect(login(payload)).resolves.toEqual({ access_token: 'jwt-token' })
    expect(mockedPost).toHaveBeenCalledWith('/auth/login', payload)
  })

  it('envia POST /users', async () => {
    const user = { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' }
    mockedPost.mockResolvedValue({ data: user })

    const payload = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secret123',
    }
    await expect(register(payload)).resolves.toEqual(user)
    expect(mockedPost).toHaveBeenCalledWith('/users', payload)
  })
})
