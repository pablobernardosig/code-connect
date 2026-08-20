import { Link } from 'react-router'
import type { LinkProps } from 'react-router'

type TextLinkProps = LinkProps & {
  variant?: 'light' | 'accent'
}

const variantClasses = {
  light: 'text-sm text-offwhite underline',
  accent: 'text-lg text-verde-destaque',
} as const

export function TextLink({ variant = 'light', className, ...props }: TextLinkProps) {
  return (
    <Link
      {...props}
      className={`${variantClasses[variant]} font-normal leading-normal transition-opacity hover:opacity-90 ${className ?? ''}`}
    />
  )
}
