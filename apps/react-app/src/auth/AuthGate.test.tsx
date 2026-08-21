import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { setToken } from './token.ts'
import { AuthGate } from './AuthGate.tsx'

describe('AuthGate', () => {
  it('redireciona para /login quando não há token', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGate>
                <p>área logada</p>
              </AuthGate>
            }
          />
          <Route path="/login" element={<p>página de login</p>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('página de login')).toBeInTheDocument()
    expect(screen.queryByText('área logada')).not.toBeInTheDocument()
  })

  it('renderiza o conteúdo quando há token', () => {
    setToken('jwt-token', false)

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGate>
                <p>área logada</p>
              </AuthGate>
            }
          />
          <Route path="/login" element={<p>página de login</p>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('área logada')).toBeInTheDocument()
  })
})
