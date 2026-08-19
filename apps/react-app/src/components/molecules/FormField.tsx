import { useId } from 'react'
import { Input } from '../atoms/Input.tsx'
import { Label } from '../atoms/Label.tsx'

type FormFieldProps = {
  label: string
  name: string
  type?: string
  value: string
  placeholder?: string
  error?: string
  onChange: (value: string) => void
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
}: FormFieldProps) {
  const id = useId()

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="text-left text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
