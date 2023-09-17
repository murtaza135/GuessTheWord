export type APIErrorConstructor = {
  status: number;
  statusText: string;
  message?: string;
  fields?: Record<string, unknown>,
};

export default class APIError extends Error {
  public readonly status: NonNullable<APIErrorConstructor['status']>;
  public readonly statusText: NonNullable<APIErrorConstructor['statusText']>;
  public readonly fields: NonNullable<APIErrorConstructor['fields']>;

  constructor(options: APIErrorConstructor) {
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
