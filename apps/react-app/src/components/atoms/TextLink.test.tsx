import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { TextLink } from './TextLink.tsx'

describe('TextLink', () => {
  it('renderiza link com rota', () => {
    render(
      <MemoryRouter>
        <TextLink to="/cadastro">Criar cadastro</TextLink>
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Criar cadastro' })).toHaveAttribute(
      'href',
      '/cadastro',
    )
  })
})
