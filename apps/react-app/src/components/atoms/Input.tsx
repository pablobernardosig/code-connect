import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="h-13 w-full rounded-md border border-transparent bg-auth-surface px-4 text-xl text-auth-bg placeholder:text-zinc-600 focus:border-auth-accent focus:outline-none"
    />
  )
}
