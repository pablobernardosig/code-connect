import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FormField } from './FormField.tsx'

describe('FormField', () => {
  it('associa label ao input e exibe erro', () => {
    const onChange = vi.fn()

    render(
      <FormField
        label="Email ou usuário"
        name="identifier"
        value=""
        error="Campo obrigatório"
        onChange={onChange}
      />,
    )

    const input = screen.getByLabelText('Email ou usuário')
    fireEvent.change(input, { target: { value: 'usuario123' } })

    expect(onChange).toHaveBeenCalledWith('usuario123')
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })
})
