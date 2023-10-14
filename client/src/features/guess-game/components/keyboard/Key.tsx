import { Letter } from '@/features/guess-game/types';

type Props = Omit<React.ComponentProps<"button">, 'onClick'> & {
  value: Letter;
  onClick?: (letter: Letter, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function Key({ value, onClick, ...rest }: Props) {
  return (
    <button
      className='bg-primary-900 text-white px-3.5 py-1.5 md:px-4 md:py-2 rounded-md hover:opacity-75 transition-opacity md:text-lg font-semibold'
      onClick={(event) => onClick?.(value, event)}
      {...rest}
    >
      {value.toUpperCase()}
    </button>
  );
}
