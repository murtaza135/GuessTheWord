import Text from '@/components/ui/Text';
import Guess from '@/types/Guess';

type Props = {
  guess: Guess[];
};

export default function AnswerDisplay({ guess }: Props) {
  return (
    <div className='flex gap-1 mt-2 text-slate-700'>
      <Text>Word: </Text>
      <Text>{guess.map((value) => value.letter).join('').toLowerCase()}</Text>
    </div>
  );
}
