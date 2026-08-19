import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthLayout } from './AuthLayout.tsx'

describe('AuthLayout', () => {
  it('renderiza banner e conteúdo', () => {
    render(
      <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner principal">
        <p>Conteúdo de autenticação</p>
      </AuthLayout>,
    )

    expect(screen.getByAltText('Banner principal')).toHaveAttribute('src', '/banner.png')
    expect(screen.getByText('Conteúdo de autenticação')).toBeInTheDocument()
  })
})
