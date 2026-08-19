import { Link } from 'react-router'
import type { LinkProps } from 'react-router'

type TextLinkProps = LinkProps & {
  variant?: 'light' | 'accent'
}

const variantClasses = {
  light: 'text-auth-text underline',
  accent: 'text-auth-accent',
} as const

export function TextLink({ variant = 'light', className, ...props }: TextLinkProps) {
  return (
    <Link
      {...props}
      className={`${variantClasses[variant]} text-3xl font-medium transition-opacity hover:opacity-90 ${className ?? ''}`}
    />
  )
}
