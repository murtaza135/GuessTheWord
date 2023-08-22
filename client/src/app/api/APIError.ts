import { ErrorResponse } from './types';

export default class APIError extends Error {
  public readonly status: NonNullable<ErrorResponse['status']>;
  public readonly statusText: NonNullable<ErrorResponse['statusText']>;
  public readonly fields: NonNullable<ErrorResponse['fields']>;

  constructor(options: ErrorResponse) {
    const message = options.message ?? options.statusText;
    const fields = options.fields ?? {};

    super(message);

    this.name = this.constructor.name;
    this.status = options.status;
    this.statusText = options.statusText;
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
