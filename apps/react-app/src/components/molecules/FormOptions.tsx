import { Checkbox } from '../atoms/Checkbox.tsx'
import { TextLink } from '../atoms/TextLink.tsx'

type FormOptionsProps = {
  remember: boolean
  onRememberChange: (checked: boolean) => void
  forgotPasswordTo: string
}

export function FormOptions({
  remember,
  onRememberChange,
  forgotPasswordTo,
}: FormOptionsProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-3xl text-auth-subtle">
        <Checkbox
          checked={remember}
          onChange={(event) => onRememberChange(event.target.checked)}
        />
        Lembrar-me
      </label>
      <TextLink to={forgotPasswordTo}>Esqueci a senha</TextLink>
    </div>
  )
}
