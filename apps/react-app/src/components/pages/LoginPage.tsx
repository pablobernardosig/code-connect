import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../../api/auth.ts'
import { getAuthErrorMessage } from '../../api/errors.ts'
import { setToken } from '../../auth/token.ts'
import type { LoginFormValues } from '../../hooks/useLoginForm.ts'
import { AuthHeading } from '../molecules/AuthHeading.tsx'
import { LoginForm } from '../organisms/LoginForm.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function LoginPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>()

  async function handleSubmit(values: LoginFormValues) {
    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      const { access_token } = await login({
        email: values.identifier.trim(),
        password: values.password,
      })
      setToken(access_token, values.remember)
      navigate('/')
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner do Code Connect">
      <AuthHeading title="Login" subtitle="Boas-vindas! Faça seu login." />
      <LoginForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </AuthLayout>
  )
}
