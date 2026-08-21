import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login, register } from '../../api/auth.ts'
import { getAuthErrorMessage } from '../../api/errors.ts'
import { setToken } from '../../auth/token.ts'
import type { SignUpFormValues } from '../../hooks/useSignUpForm.ts'
import { AuthHeading } from '../molecules/AuthHeading.tsx'
import { SignUpForm } from '../organisms/SignUpForm.tsx'
import { AuthLayout } from '../templates/AuthLayout.tsx'

export function SignUpPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>()

  async function handleSubmit(values: SignUpFormValues) {
    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      const email = values.email.trim()
      await register({
        name: values.name.trim(),
        email,
        password: values.password,
      })
      const { access_token } = await login({
        email,
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
    <AuthLayout bannerSrc="/banner.png" bannerAlt="Banner do cadastro">
      <AuthHeading title="Cadastro" subtitle="Olá! Preencha seus dados." />
      <SignUpForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </AuthLayout>
  )
}
