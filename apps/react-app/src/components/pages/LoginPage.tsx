import { AuthHeading } from '../molecules/AuthHeading.tsx'
import { LoginForm } from '../organisms/LoginForm.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function LoginPage() {
  return (
    <AuthLayout bannerSrc="/banner.webp" bannerAlt="Banner do Code Connect">
      <AuthHeading title="Login" subtitle="Boas-vindas! Faça seu login." />
      <LoginForm />
    </AuthLayout>
  )
}
