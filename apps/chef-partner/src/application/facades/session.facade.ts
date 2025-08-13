// app/actions/session.actions.ts
'use server'

import { AuthSignInResponseDTO } from '@milnatix-core/dtos'
import { CryptPortOut } from '@/ports/out/crypt.port'
import { TokenPortOut } from '@/ports/out/token.port'
import { AuthRepositoryPortOut } from '@/ports/out/auth-repository.port'
import { cookies } from 'next/headers'
import { HttpAuthRepositoryAdapter } from '@/adapters/http/auth-repository.adapter'
import { JWTTokenAdapter } from '@/adapters/jwt/token.adapter'
import { JoseCryptAdapter } from '@/adapters/jose/crypt.adapter'

export async function setSession(
  session: AuthSignInResponseDTO,
) {
  const crypt: CryptPortOut<AuthSignInResponseDTO> = new JoseCryptAdapter()
  
  const [encryptedSession, cookieStore] = await Promise.all([
    crypt.encrypt(session),
    cookies(),
  ])

  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getSession(): Promise<AuthSignInResponseDTO> {
  const authRepository: AuthRepositoryPortOut = new HttpAuthRepositoryAdapter()
  const token: TokenPortOut = new JWTTokenAdapter()
  const crypt: CryptPortOut<AuthSignInResponseDTO> = new JoseCryptAdapter()

  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')

  if (!cookie?.value) {
    throw new Error('Session not found')
  }

  const session = await crypt.decrypt(cookie.value)
  const tokenExpired = token.isExpired(session.accessToken)

  if (!tokenExpired) {
    return session
  }

  const result = await authRepository.refresh({ refreshToken: session.refreshToken })
  if (!result.success) {
    throw result.error
  }

  const refreshedSession = result.value
  const newSession = { ...session, ...refreshedSession }

  await setSession(newSession)
  return newSession
}
