export type ExtractEnumValue<
  Enum extends string | number | bigint | boolean | null | undefined,
  ValueType extends string | number | bigint | boolean | null | undefined,
> = `${Enum}` extends `${infer T extends ValueType}` ? T : never;

export type PickRequired<T, K extends keyof T> = Partial<T> & { [P in K]-?: T[P] };

// @source: https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
export type AnyJSON =
  | null
  | string
  | number
  | boolean
  | Array<AnyJSON>
  | { [x: string]: AnyJSON; };

export type AnyJSONObject = { [x: string]: AnyJSON; };
