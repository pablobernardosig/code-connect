import { useState } from 'react'

export type SignUpFormValues = {
  name: string
  email: string
  password: string
  remember: boolean
}

type SignUpFormErrors = {
  name?: string
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useSignUpForm() {
  const [values, setValues] = useState<SignUpFormValues>({
    name: '',
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<SignUpFormErrors>({})

  function setFieldValue(field: 'name' | 'email' | 'password', value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function setRemember(remember: boolean) {
    setValues((current) => ({ ...current, remember }))
  }

  function validate() {
    const nextErrors: SignUpFormErrors = {}

    if (!values.name.trim()) {
      nextErrors.name = 'Informe seu nome.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Informe seu email.'
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Informe um email válido.'
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Informe sua senha.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  return {
    values,
    errors,
    setFieldValue,
    setRemember,
    validate,
  }
}
