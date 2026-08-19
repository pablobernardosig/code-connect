import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './Checkbox.tsx'

describe('Checkbox', () => {
  it('muda estado checked', () => {
    render(<Checkbox aria-label="Lembrar-me" />)

    const input = screen.getByLabelText('Lembrar-me')
    fireEvent.click(input)

    expect(input).toBeChecked()
  })
})
