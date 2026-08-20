import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon.tsx'

describe('Icon', () => {
  it('renderiza o svg do ícone pelo nome', () => {
    const { container } = render(<Icon name="login" />)
    const icon = container.querySelector('svg[data-icon="login"]')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })
})
