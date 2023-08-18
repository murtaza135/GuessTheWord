export type ExtractEnumValue<
  Enum extends string | number | bigint | boolean | null | undefined,
  ValueType extends string | number | bigint | boolean | null | undefined,
> = `${Enum}` extends `${infer T extends ValueType}` ? T : never;

export type PickRequired<T, K extends keyof T> = Partial<T> & { [P in K]-?: T[P] };
