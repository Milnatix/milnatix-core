export type Result<T, E> =
  | { success: true; value: T; error?: undefined }
  | { success: false; error: E; value?: undefined };

export const Result = {
  ok: <T, E = never>(value: T): Result<T, E> => ({ success: true, value }),
  err: <T = never, E = Error>(error: E): Result<T, E> => ({ success: false, error }),
};
