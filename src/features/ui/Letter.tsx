import type LetterValue from "@/types/Letter";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: LetterValue;
};

export default function Letter({ value, ...rest }: Props) {
  return (
    <button
      className='bg-primary-900 dark:bg-primary-400 text-white dark:text-black px-4 py-2 rounded-md hover:opacity-75 transition-opacity'
      {...rest}
    >
      {value.toUpperCase()}
    </button>
  );
}
