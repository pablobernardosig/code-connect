import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded border-transparent bg-cinza-medio px-4 py-2 text-sm leading-normal text-cinza-escuro placeholder:text-cinza-escuro focus:border-verde-destaque focus:outline-none"
    />
  )
}
