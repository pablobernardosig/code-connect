import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { SignUpForm } from './SignUpForm.tsx'

describe('SignUpForm', () => {
  it('submete dados válidos', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <SignUpForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Ana Silva' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'ana@email.com' },
    })
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'senha123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ana Silva',
      email: 'ana@email.com',
      password: 'senha123',
      remember: false,
    })
  })

  it('mostra erro quando campos obrigatórios estão vazios', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <SignUpForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe seu email.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })

  it('mostra erro quando o email é inválido', () => {
    const onSubmit = vi.fn()

    render(
      <MemoryRouter>
        <SignUpForm onSubmit={onSubmit} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Ana Silva' },
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'email-invalido' },
    })
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'senha123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Informe um email válido.')).toBeInTheDocument()
  })

  it('mostra erro de submissão e desabilita o botão', () => {
    render(
      <MemoryRouter>
        <SignUpForm isSubmitting submitError="Este email já está em uso." />
      </MemoryRouter>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Este email já está em uso.')
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeDisabled()
  })
})
