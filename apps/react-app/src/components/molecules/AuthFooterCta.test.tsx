import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthFooterCta } from './AuthFooterCta.tsx'

describe('AuthFooterCta', () => {
  it('renderiza texto e call to action', () => {
    render(
      <MemoryRouter>
        <AuthFooterCta
          prompt="Ainda não tem conta?"
          ctaLabel="Crie seu cadastro!"
          ctaTo="/cadastro"
          icon="assignment"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Crie seu cadastro!' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })

  it('renderiza call to action em linha com ícone de login', () => {
    render(
      <MemoryRouter>
        <AuthFooterCta
          prompt="Já tem conta?"
          ctaLabel="Faça seu login!"
          ctaTo="/login"
          layout="inline"
          icon="login"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Já tem conta?')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Faça seu login!' })).toHaveAttribute('href', '/login')
  })
})
