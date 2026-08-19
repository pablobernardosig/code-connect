import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Label } from './Label.tsx'

describe('Label', () => {
  it('renderiza conteúdo do label', () => {
    render(<Label htmlFor="senha">Senha</Label>)
    expect(screen.getByText('Senha')).toBeInTheDocument()
  })
})
