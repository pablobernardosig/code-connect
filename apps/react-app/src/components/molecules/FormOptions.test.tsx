import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { FormOptions } from './FormOptions.tsx'

describe('FormOptions', () => {
  it('altera lembrar-me e renderiza link de recuperação', () => {
    const onRememberChange = vi.fn()

    render(
      <MemoryRouter>
        <FormOptions
          remember={false}
          onRememberChange={onRememberChange}
          forgotPasswordTo="/recuperar"
        />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByLabelText('Lembrar-me'))
    expect(onRememberChange).toHaveBeenCalledWith(true)
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveAttribute(
      'href',
      '/recuperar',
    )
  })
})
