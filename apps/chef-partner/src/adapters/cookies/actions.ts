'use server';

import { cookies } from 'next/headers';

export async function setValueInCookies(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getValueFromCookies(key: string) {
  const cookieStore = await cookies();
  console.log('cookieStore', cookieStore);
  return cookieStore.get(key)?.value;
}
