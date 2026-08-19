import { AuthLayout } from '../templates/AuthLayout.tsx'

export function SignUpPage() {
  return (
    <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner do cadastro">
      <h1 className="text-6xl font-bold text-auth-text">Cadastro</h1>
      <p className="mt-5 text-4xl text-auth-muted">
        Página preparada para reutilizar o mesmo layout da autenticação.
      </p>
    </AuthLayout>
  )
}
