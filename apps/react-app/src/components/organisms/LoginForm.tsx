import type { FormEvent } from 'react'
import { Button } from '../atoms/Button.tsx'
import { Divider } from '../atoms/Divider.tsx'
import { AuthFooterCta } from '../molecules/AuthFooterCta.tsx'
import { FormField } from '../molecules/FormField.tsx'
import { FormOptions } from '../molecules/FormOptions.tsx'
import { SocialProviders } from '../molecules/SocialProviders.tsx'
import { useLoginForm } from '../../hooks/useLoginForm.ts'
import type { LoginFormValues } from '../../hooks/useLoginForm.ts'

type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { values, errors, setFieldValue, setRemember, validate } = useLoginForm()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    onSubmit?.(values)
  }

  return (
    <form className="mt-8 flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-4">
        <FormField
          name="identifier"
          label="Email ou usuário"
          value={values.identifier}
          placeholder="usuario123"
          error={errors.identifier}
          onChange={(value) => setFieldValue('identifier', value)}
        />
        <FormField
          name="password"
          type="password"
          label="Senha"
          value={values.password}
          placeholder="******"
          error={errors.password}
          onChange={(value) => setFieldValue('password', value)}
        />
        <FormOptions
          remember={values.remember}
          onRememberChange={setRemember}
          forgotPasswordTo="/recuperar-senha"
        />
      </div>

      <Button type="submit" showArrow>
        Login
      </Button>

      <div className="flex flex-col gap-2">
        <Divider text="ou entre com outras contas" />
        <SocialProviders />
      </div>

      <AuthFooterCta
        prompt="Ainda não tem conta?"
        ctaLabel="Crie seu cadastro!"
        ctaTo="/cadastro"
        layout="stack"
        icon="assignment"
      />
    </form>
  )
}
