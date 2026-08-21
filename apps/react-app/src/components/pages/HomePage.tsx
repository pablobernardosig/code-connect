import { useNavigate } from 'react-router'
import { clearToken } from '../../auth/token.ts'
import { Button } from '../atoms/Button.tsx'
import { AuthHeading } from '../molecules/AuthHeading.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function HomePage() {
  const navigate = useNavigate()

  function handleLogout() {
    clearToken()
    navigate('/login')
  }

  return (
    <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner do Code Connect">
      <AuthHeading title="Olá!" subtitle="Você está autenticado." />
      <div className="mt-8">
        <Button type="button" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </AuthLayout>
  )
}
