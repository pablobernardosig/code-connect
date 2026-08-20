import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { LoginPage } from './LoginPage.tsx'

describe('LoginPage', () => {
  it('renderiza título, banner e formulário', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByAltText('Banner do Code Connect')).toHaveAttribute('src', '/banner.webp')
    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
  })
})
