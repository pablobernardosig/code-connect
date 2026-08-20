import type { FormEvent } from 'react'
import { Button } from '../atoms/Button.tsx'
import { Divider } from '../atoms/Divider.tsx'
import { AuthFooterCta } from '../molecules/AuthFooterCta.tsx'
import { FormField } from '../molecules/FormField.tsx'
import { FormOptions } from '../molecules/FormOptions.tsx'
import { SocialProviders } from '../molecules/SocialProviders.tsx'
import { useSignUpForm } from '../../hooks/useSignUpForm.ts'
import type { SignUpFormValues } from '../../hooks/useSignUpForm.ts'

type SignUpFormProps = {
  onSubmit?: (values: SignUpFormValues) => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { values, errors, setFieldValue, setRemember, validate } = useSignUpForm()

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
          name="name"
          label="Nome"
          value={values.name}
          placeholder="Nome completo"
          error={errors.name}
          onChange={(value) => setFieldValue('name', value)}
        />
        <FormField
          name="email"
          type="email"
          label="Email"
          value={values.email}
          placeholder="Digite seu email"
          error={errors.email}
          onChange={(value) => setFieldValue('email', value)}
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
        <FormOptions remember={values.remember} onRememberChange={setRemember} />
      </div>

      <Button type="submit" showArrow>
        Cadastrar
      </Button>

      <div className="flex flex-col gap-2">
        <Divider text="ou entre com outras contas" />
        <SocialProviders />
      </div>

      <AuthFooterCta
        prompt="Já tem conta?"
        ctaLabel="Faça seu login!"
        ctaTo="/login"
        layout="inline"
        icon="login"
      />
    </form>
  )
}
