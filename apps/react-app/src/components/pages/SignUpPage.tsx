import { AuthHeading } from '../molecules/AuthHeading.tsx'
import { SignUpForm } from '../organisms/SignUpForm.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function SignUpPage() {
  return (
    <AuthLayout bannerSrc="/banner-cadastro.webp" bannerAlt="Banner do cadastro">
      <AuthHeading title="Cadastro" subtitle="Olá! Preencha seus dados." />
      <SignUpForm />
    </AuthLayout>
  )
}
