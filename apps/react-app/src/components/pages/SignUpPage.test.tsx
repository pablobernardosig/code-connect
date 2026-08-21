import { AxiosError } from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { login, register } from '../../api/auth.ts'
import { SignUpPage } from './SignUpPage.tsx'

vi.mock('../../api/auth.ts', () => ({
  login: vi.fn(),
  register: vi.fn(),
}))

const mockedLogin = vi.mocked(login)
const mockedRegister = vi.mocked(register)

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

function fillSignUpForm() {
  fireEvent.change(screen.getByLabelText('Nome'), {
    target: { value: 'Ada Lovelace' },
  })
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'ada@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: 'secret123' },
  })
}

function renderSignUpPage() {
  return render(
    <MemoryRouter initialEntries={['/cadastro']}>
      <Routes>
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/" element={<p>área logada</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SignUpPage', () => {
  beforeEach(() => {
    mockedLogin.mockReset()
    mockedRegister.mockReset()
  })
  it('renderiza título, banner, formulário e CTA de login', () => {
    renderSignUpPage()

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByText('Olá! Preencha seus dados.')).toBeInTheDocument()
    expect(screen.getByAltText('Banner do cadastro')).toHaveAttribute('src', '/banner.png')
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute(
      'href',
      '/login',
    )
  })

  it('cadastra, autentica e navega para a home', async () => {
    mockedRegister.mockResolvedValue({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    })
    mockedLogin.mockResolvedValue({ access_token: 'jwt-token' })

    renderSignUpPage()
    fillSignUpForm()
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByText('área logada')).toBeInTheDocument()
    })
    expect(mockedRegister).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secret123',
    })
    expect(mockedLogin).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'secret123',
    })
    expect(sessionStorage.getItem('code-connect.access_token')).toBe('jwt-token')
  })

  it('mostra erro quando o email já está em uso', async () => {
    mockedRegister.mockRejectedValue(axiosErrorWithStatus(409))

    renderSignUpPage()
    fillSignUpForm()
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Este email já está em uso.',
    )
    expect(mockedLogin).not.toHaveBeenCalled()
  })

  it('desabilita o botão enquanto a requisição está em andamento', async () => {
    let resolveRegister!: (value: {
      id: number
      name: string
      email: string
    }) => void
    mockedRegister.mockReturnValue(
      new Promise((resolve) => {
        resolveRegister = resolve
      }),
    )
    mockedLogin.mockResolvedValue({ access_token: 'jwt-token' })

    renderSignUpPage()
    fillSignUpForm()
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cadastrar/i })).toBeDisabled()
    })

    resolveRegister({
      id: 1,
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    })

    await waitFor(() => {
      expect(screen.getByText('área logada')).toBeInTheDocument()
    })
  })
})
