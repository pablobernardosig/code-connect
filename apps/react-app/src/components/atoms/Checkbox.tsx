import type { InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox(props: CheckboxProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className="size-6 rounded border border-auth-subtle accent-auth-accent"
    />
  )
}
