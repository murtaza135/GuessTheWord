import { APIResponse } from './types';

export default class APIError extends Error {
  public readonly status: APIResponse['status'];
  public readonly statusText: APIResponse['statusText'];
  public readonly fields: NonNullable<APIResponse['fields']>;

  constructor(options: APIResponse) {
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
