import AxeBuilder from '@axe-core/playwright'
import { expect, type Page } from '@playwright/test'
import type { Result } from 'axe-core'

/** Nível AA: WCAG 2.0, 2.1 e 2.2 (A + AA). */
export const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] as const

export function formatAxeViolations(violations: Result[]): string {
  if (violations.length === 0) {
    return ''
  }

  return violations
    .map((violation) => {
      const criteria = violation.tags.filter((tag) => tag.startsWith('wcag')).join(', ')
      const nodes = violation.nodes
        .map((node) => {
          const target = node.target.join(', ')
          const summary = node.failureSummary ?? node.html
          return `    • ${target}\n      ${summary}`
        })
        .join('\n')

      return `[${violation.impact ?? 'unknown'}] ${violation.id} (${criteria})\n  ${violation.help}\n  ${violation.helpUrl}\n${nodes}`
    })
    .join('\n\n')
}

export async function expectNoWcagAaViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags([...WCAG_AA_TAGS]).analyze()
  const report = formatAxeViolations(results.violations)

  expect(report, report).toBe('')
}
