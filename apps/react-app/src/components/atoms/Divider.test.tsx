import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from './Divider.tsx'

describe('Divider', () => {
  it('renderiza texto central', () => {
    render(<Divider text="ou entre com outras contas" />)
    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })
})
