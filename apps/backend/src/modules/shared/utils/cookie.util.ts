import { Request, Response } from 'express';
import { COOKIE_NAME } from '../constants/cookie.constants';

type CookieValue = (typeof COOKIE_NAME)[keyof typeof COOKIE_NAME];
type CookiesMap = Partial<Record<CookieValue, string>>;

function isLocalhost(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    (process.env.HOSTNAME === 'localhost' || process.env.HOSTNAME === undefined)
  );
}

export function setCookie(
  res: Response,
  name: CookieValue,
  value: string,
  options?: Partial<{
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    maxAge: number;
    path: string;
  }>,
) {
  const onLocalhost = isLocalhost();

  res.cookie(name, value, {
    httpOnly: options?.httpOnly ?? false,
    secure: options?.secure ?? !onLocalhost, // HTTPS apenas fora do localhost
    sameSite: options?.sameSite ?? (onLocalhost ? 'lax' : 'none'),
    maxAge: options?.maxAge,
    path: options?.path ?? '/',
  });
}

export function getCookieValue(
  req: Request,
  name: CookieValue,
): string | undefined {
  return (req.cookies as CookiesMap)[name];
}
