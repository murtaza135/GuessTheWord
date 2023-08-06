import type LetterValue from "@/types/Letter";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  value?: LetterValue;
};

export default function LetterDisplay({ value }: Props) {
  return (
    <p className='border-b-2 border-primary-900 text-primary-900 text-2xl md:text-4xl md:pb-1 px-2'>
      {value?.toUpperCase()}
    </p>
  );
}
