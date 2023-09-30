import GuessWord from '@/types/GuessWord';

type Props = {
  guess: GuessWord[];
};

export default function AnswerDisplay({ guess }: Props) {
  return (
    <div className='flex gap-1 mt-2 text-slate-700'>
      <p className='font-semibold md:text-lg text-center'>Word: </p>
      <p className='font-semibold md:text-lg text-center'>{guess.map((value) => value.letter).join('').toLowerCase()}</p>
    </div>
  );
}
