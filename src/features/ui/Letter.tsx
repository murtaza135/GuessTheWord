import type LetterValue from "@/types/Letter";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: LetterValue;
};

export default function Letter({ value, ...rest }: Props) {
  return (
    <button
      className='bg-primary-900 text-white px-4 py-2 rounded-md hover:opacity-75 transition-opacity text-lg font-semibold'
      {...rest}
    >
      {value.toUpperCase()}
    </button>
  );
}
