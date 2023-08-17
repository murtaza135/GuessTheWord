import { getReasonPhrase, getStatusCode } from 'http-status-codes';
import { type XOR } from 'ts-essentials';
import { type Status, type StatusText } from './status-codes';

type BaseAPIErrorConstructor = {
  message?: string;
  fields?: Record<string, unknown>,
  cause?: Error,
};

type APIErrorConstructor = XOR<
  BaseAPIErrorConstructor & { status: Status; },
  BaseAPIErrorConstructor & { statusText: StatusText; }
>;

export default class APIError extends Error {
  public readonly status: Status;
  public readonly statusText: StatusText;
  public readonly fields: Record<string, unknown>;

  constructor(options: APIErrorConstructor) {
    const status = options.status ?? getStatusCode(options.statusText) as Status;
    const statusText = options.statusText ?? getReasonPhrase(options.status) as StatusText;
    const message = options.message ?? options.cause?.message ?? statusText;
    const fields = options.fields ?? {};

    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause: options.cause });

    this.name = this.constructor.name;
    this.status = status;
    this.statusText = statusText;
    this.fields = fields;
  }

  toJSON() {
    return {
      status: this.status,
      statusText: this.statusText,
      message: this.message,
      fields: this.fields
    };
  }
}
