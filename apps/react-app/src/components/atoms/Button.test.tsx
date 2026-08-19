import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button.tsx'

describe('Button', () => {
  it('renderiza o conteúdo e dispara clique', () => {
    const onClick = vi.fn()

    render(
      <Button type="button" onClick={onClick}>
        Login
      </Button>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
