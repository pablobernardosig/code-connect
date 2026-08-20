import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SocialButton } from './SocialButton.tsx'

describe('SocialButton', () => {
  it('renderiza ícone e rótulo', () => {
    render(<SocialButton label="Github" iconSrc="/github.svg" iconAlt="Logo do Github" />)
    expect(screen.getByText('Github')).toBeInTheDocument()
    expect(screen.getByAltText('Logo do Github')).toHaveAttribute('src', '/github.svg')
  })
})
