import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm.tsx'

describe('LoginForm', () => {
  it('submete dados válidos', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Email ou usuário'), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'senha123' },
    })
    fireEvent.click(screen.getAllByRole('button', { name: /login/i })[0])

    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'ada@example.com',
      password: 'senha123',
      remember: false,
    })
  })

  it('mostra erro quando campos obrigatórios estão vazios', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getAllByRole('button', { name: /login/i })[0])

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Informe seu email ou usuário.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })

  it('mostra erro quando o email é inválido', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <LoginForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Email ou usuário'), {
      target: { value: 'usuario123' },
    })
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'senha123' },
    })
    fireEvent.click(screen.getAllByRole('button', { name: /login/i })[0])

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Informe um email válido.')).toBeInTheDocument()
  })

  it('mostra erro de submissão e desabilita o botão', () => {
    render(
      <MemoryRouter>
        <LoginForm isSubmitting submitError="Email ou senha inválidos." />
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Email ou senha inválidos.')
    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()
  })
})
