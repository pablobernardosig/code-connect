import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { setToken } from '../../auth/token.ts'
import { HomePage } from './HomePage.tsx'

describe('HomePage', () => {
  it('renderiza saudação e faz logout', () => {
    setToken('jwt-token', false)

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<p>página de login</p>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Olá!' })).toBeInTheDocument()
    expect(screen.getByText('Você está autenticado.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Sair' }))

    expect(screen.getByText('página de login')).toBeInTheDocument()
    expect(sessionStorage.getItem('code-connect.access_token')).toBeNull()
  })
})
