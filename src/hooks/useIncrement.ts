import { useState, useCallback } from 'react';

export default function useIncrement(defaultValue: number) {
  const [value, setValue] = useState<number>(defaultValue);

  const incrementValue = useCallback(() => setValue((value => value + 1)), []);

  return [value, incrementValue] as const;
}