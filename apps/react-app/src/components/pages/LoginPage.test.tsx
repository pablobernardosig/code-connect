import { AxiosError } from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { login } from '../../api/auth.ts'
import { LoginPage } from './LoginPage.tsx'

vi.mock('../../api/auth.ts', () => ({
  login: vi.fn(),
  register: vi.fn(),
}))

const mockedLogin = vi.mocked(login)

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

function fillLoginForm() {
  fireEvent.change(screen.getByLabelText('Email ou usuário'), {
    target: { value: 'ada@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: 'secret123' },
  })
}

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<p>área logada</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockedLogin.mockReset()
  })
  it('renderiza título, banner e formulário', () => {
    renderLoginPage()

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByAltText('Banner do Code Connect')).toHaveAttribute('src', '/banner.png')
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })

  it('autentica, persiste o token e navega para a home', async () => {
    mockedLogin.mockResolvedValue({ access_token: 'jwt-token' })

    renderLoginPage()
    fillLoginForm()
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('área logada')).toBeInTheDocument()
    })
    expect(mockedLogin).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'secret123',
    })
    expect(sessionStorage.getItem('code-connect.access_token')).toBe('jwt-token')
  })

  it('mostra erro quando as credenciais são inválidas', async () => {
    mockedLogin.mockRejectedValue(axiosErrorWithStatus(401))

    renderLoginPage()
    fillLoginForm()
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Email ou senha inválidos.',
    )
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
  })

  it('desabilita o botão enquanto a requisição está em andamento', async () => {
    let resolveLogin!: (value: { access_token: string }) => void
    mockedLogin.mockReturnValue(
      new Promise((resolve) => {
        resolveLogin = resolve
      }),
    )

    renderLoginPage()
    fillLoginForm()
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
    })

    resolveLogin({ access_token: 'jwt-token' })

    await waitFor(() => {
      expect(screen.getByText('área logada')).toBeInTheDocument()
    })
  })
})
