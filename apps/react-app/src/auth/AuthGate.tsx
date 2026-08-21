import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { getToken } from './token.ts'

type AuthGateProps = {
  children: ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  if (!getToken()) {
    return <Navigate to="/login" replace />
  }

  return children
}
