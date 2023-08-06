import type LetterValue from "@/types/Letter";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  value: LetterValue;
  onClick?: (letter: LetterValue, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Letter({ value, onClick, ...rest }: Props) {
  return (
    <button
      className='bg-primary-900 text-white px-2.5 py-1 md:px-4 md:py-2 rounded-md hover:opacity-75 transition-opacity md:text-lg font-semibold'
      onClick={(event) => onClick?.(value, event)}
      {...rest}
    >
      {value.toUpperCase()}
    </button>
  );
}
