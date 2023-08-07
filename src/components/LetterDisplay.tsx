import type LetterValue from "@/types/Letter";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  show: boolean;
  value?: LetterValue | '';
};

export default function LetterDisplay({ show, value }: Props) {
  return (
    <p className='border-b-2 border-primary-900 text-primary-900 text-2xl md:text-4xl md:pb-1 px-2 min-h-[2rem] min-w-[2rem]'>
      {show && value?.toUpperCase()}
    </p>
  );
}
