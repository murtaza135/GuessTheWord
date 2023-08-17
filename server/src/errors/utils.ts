import APIError from './APIError';

export function isErrorOperational(error: unknown): error is APIError {
  return error instanceof APIError && error.status >= 400 && error.status < 500;
}
