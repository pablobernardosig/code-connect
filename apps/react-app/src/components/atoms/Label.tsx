import type { LabelHTMLAttributes, ReactNode } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className="mb-2 block text-left text-4xl font-medium text-auth-text">
      {children}
    </label>
  )
}
