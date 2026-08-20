import { Checkbox } from '../atoms/Checkbox.tsx'
import { TextLink } from '../atoms/TextLink.tsx'

type FormOptionsProps = {
  remember: boolean
  onRememberChange: (checked: boolean) => void
  forgotPasswordTo?: string
}

export function FormOptions({
  remember,
  onRememberChange,
  forgotPasswordTo,
}: FormOptionsProps) {
  return (
    <div className={`flex items-center ${forgotPasswordTo ? 'justify-between' : ''}`}>
      <label className="flex items-center gap-2 text-sm leading-normal text-cinza-medio">
        <Checkbox
          checked={remember}
          onChange={(event) => onRememberChange(event.target.checked)}
        />
        Lembrar-me
      </label>
      {forgotPasswordTo ? <TextLink to={forgotPasswordTo}>Esqueci a senha</TextLink> : null}
    </div>
  )
}
