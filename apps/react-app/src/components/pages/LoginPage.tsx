import { LoginForm } from '../organisms/LoginForm.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function LoginPage() {
  return (
    <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner do Code Connect">
      <h1 className="text-6xl font-bold text-auth-text">Login</h1>
      <p className="mt-5 text-4xl text-auth-muted">Boas-vindas! Faça seu login.</p>
      <LoginForm />
    </AuthLayout>
  )
}
