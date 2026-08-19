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
      target: { value: 'usuario123' },
    })
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'senha123' },
    })
    fireEvent.click(screen.getAllByRole('button', { name: /login/i })[0])

    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
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
})
