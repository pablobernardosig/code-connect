import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input.tsx'

describe('Input', () => {
  it('aceita valor e dispara mudança', () => {
    const onChange = vi.fn()

    render(<Input aria-label="Email ou usuário" value="" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Email ou usuário'), {
      target: { value: 'usuario123' },
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
