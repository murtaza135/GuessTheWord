import type LetterValue from "@/types/Letter";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  value: LetterValue;
};

export default function LetterDisplay({ value }: Props) {
  return (
    <p className='border-b-2 border-primary-900 text-primary-900 text-4xl pb-1 aspect-square w-10 text-center'>
      {value}
    </p>
  );
}
