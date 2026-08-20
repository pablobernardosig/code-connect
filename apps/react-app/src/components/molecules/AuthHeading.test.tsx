import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthHeading } from './AuthHeading.tsx'

describe('AuthHeading', () => {
  it('renderiza título e subtítulo', () => {
    render(<AuthHeading title="Cadastro" subtitle="Olá! Preencha seus dados." />)

    expect(screen.getByRole('heading', { name: 'Cadastro' })).toBeInTheDocument()
    expect(screen.getByText('Olá! Preencha seus dados.')).toBeInTheDocument()
  })
})
