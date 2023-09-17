import type Letter from "@/types/Letter";

type Props = React.ComponentProps<"p"> & {
  show: boolean;
  value?: Letter | '';
};

export default function LetterDisplay({ show, value }: Props) {
  return (
    <p className='border-b-2 border-primary-900 text-primary-900 text-2xl md:text-4xl md:pb-1 px-2 min-h-[2rem] min-w-[2rem] text-center'>
      {show && value?.toUpperCase()}
    </p>
  );
}
