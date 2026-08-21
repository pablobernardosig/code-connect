import { AxiosError } from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { describe, expect, it } from 'vitest'
import { getAuthErrorMessage } from './errors.ts'

function axiosErrorWithStatus(status: number) {
  return new AxiosError(
    'Request failed',
    AxiosError.ERR_BAD_REQUEST,
    {} as InternalAxiosRequestConfig,
    undefined,
    {
      status,
      statusText: 'Error',
      data: {},
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    } as AxiosResponse,
  )
}

describe('getAuthErrorMessage', () => {
  it('mapeia 401 para credenciais inválidas', () => {
    expect(getAuthErrorMessage(axiosErrorWithStatus(401))).toBe(
      'Email ou senha inválidos.',
    )
  })

  it('mapeia 409 para email em uso', () => {
    expect(getAuthErrorMessage(axiosErrorWithStatus(409))).toBe(
      'Este email já está em uso.',
    )
  })

  it('usa mensagem genérica para outros erros', () => {
    expect(getAuthErrorMessage(axiosErrorWithStatus(500))).toBe(
      'Não foi possível concluir a operação. Tente novamente.',
    )
    expect(getAuthErrorMessage(new Error('falha'))).toBe(
      'Não foi possível concluir a operação. Tente novamente.',
    )
  })
})
