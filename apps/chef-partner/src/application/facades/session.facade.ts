// app/actions/session.actions.ts
'use server'

import { AuthSignInResponseDTO } from '@milnatix-core/dtos'
import { UniversalSessionAdapter } from '@/adapters/cookies/session-client.adapter'

export async function setSession(
  session: AuthSignInResponseDTO,
) {
  await new UniversalSessionAdapter().setSession(session);
}

