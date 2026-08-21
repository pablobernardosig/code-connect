import { useState } from 'react'

export type LoginFormValues = {
  identifier: string
  password: string
  remember: boolean
}

type LoginFormErrors = {
  identifier?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLoginForm() {
  const [values, setValues] = useState<LoginFormValues>({
    identifier: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function setFieldValue(field: 'identifier' | 'password', value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function setRemember(remember: boolean) {
    setValues((current) => ({ ...current, remember }))
  }

  function validate() {
    const nextErrors: LoginFormErrors = {}

    if (!values.identifier.trim()) {
      nextErrors.identifier = 'Informe seu email ou usuário.'
    } else if (!emailPattern.test(values.identifier.trim())) {
      nextErrors.identifier = 'Informe um email válido.'
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
