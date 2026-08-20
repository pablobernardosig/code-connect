import { expect, test } from '@playwright/test'
import { expectNoWcagAaViolations } from './wcag.ts'

test.describe('acessibilidade WCAG AA', () => {
  test('página de login no estado inicial', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expectNoWcagAaViolations(page)
  })

  test('página de login após erros de validação', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Informe seu email ou usuário.')).toBeVisible()
    await expectNoWcagAaViolations(page)
  })

  test('página de cadastro no estado inicial', async ({ page }) => {
    await page.goto('/cadastro')
    await expect(page.getByRole('heading', { name: 'Cadastro' })).toBeVisible()
    await expectNoWcagAaViolations(page)
  })

  test('página de cadastro após erros de validação', async ({ page }) => {
    await page.goto('/cadastro')
    await page.getByRole('button', { name: 'Cadastrar' }).click()
    await expect(page.getByText('Informe seu nome.')).toBeVisible()
    await expectNoWcagAaViolations(page)
  })

  test('página de login em viewport de 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expectNoWcagAaViolations(page)
  })
})
