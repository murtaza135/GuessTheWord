export type ErrorResponse = {
  status: number;
  statusText: string;
  message?: string;
  fields?: Record<string, unknown>,
};