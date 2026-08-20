import type { LabelHTMLAttributes, ReactNode } from 'react'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode
}

export function Label({ children, ...props }: LabelProps) {
  return (
    <label {...props} className="block text-left text-lg font-normal leading-normal text-offwhite">
      {children}
    </label>
  )
}
