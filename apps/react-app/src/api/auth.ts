import { http } from './http.ts'

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type UserResponse = {
  id: number
  name: string
  email: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>('/auth/login', payload)
  return data
}

export async function register(payload: RegisterPayload): Promise<UserResponse> {
  const { data } = await http.post<UserResponse>('/users', payload)
  return data
}
