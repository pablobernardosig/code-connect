import axios from 'axios'

export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 401) {
      return 'Email ou senha inválidos.'
    }

    if (status === 409) {
      return 'Este email já está em uso.'
    }
  }

  return 'Não foi possível concluir a operação. Tente novamente.'
}
