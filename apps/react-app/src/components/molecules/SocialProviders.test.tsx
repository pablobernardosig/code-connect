import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SocialProviders } from './SocialProviders.tsx'

describe('SocialProviders', () => {
  it('renderiza provedores sociais', () => {
    render(<SocialProviders />)

    expect(screen.getByAltText('Logo do Github')).toHaveAttribute('src', '/github.svg')
    expect(screen.getByAltText('Logo do Gmail')).toHaveAttribute('src', '/gmail.svg')
  })
})
