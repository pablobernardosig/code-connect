import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  showArrow?: boolean
}

export function Button({ children, showArrow = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-auth-accent px-6 py-4 text-3xl font-semibold text-auth-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{children}</span>
      {showArrow ? <span aria-hidden="true">→</span> : null}
    </button>
  )
}
