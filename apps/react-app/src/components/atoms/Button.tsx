import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon.tsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  showArrow?: boolean
}

export function Button({ children, showArrow = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-verde-destaque px-4 py-3 text-lg font-semibold leading-normal text-verde-petroleo transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{children}</span>
      {showArrow ? <Icon name="arrow_forward" className="text-2xl" /> : null}
    </button>
  )
}
