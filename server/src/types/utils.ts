export type ExtractEnumValue<
  Enum extends string | number | bigint | boolean | null | undefined,
  ValueType extends string | number | bigint | boolean | null | undefined,
> = `${Enum}` extends `${infer T extends ValueType}` ? T : never;
