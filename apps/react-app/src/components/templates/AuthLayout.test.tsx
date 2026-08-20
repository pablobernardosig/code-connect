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

    const banner = screen.getByAltText('Banner principal')
    expect(banner).toHaveAttribute('src', '/banner.png')
    expect(banner).toHaveAttribute('width', '384')
    expect(banner).toHaveAttribute('height', '600')
    expect(banner).toHaveAttribute('fetchpriority', 'high')
    expect(banner).toHaveAttribute('decoding', 'async')
    expect(screen.getByText('Conteúdo de autenticação')).toBeInTheDocument()
  })
})
