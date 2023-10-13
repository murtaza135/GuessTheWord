import { LetterData } from '@/features/guess-game/types';

type Props = {
  guess: LetterData[];
  showAll?: boolean;
};

export function CurrentGuess({ guess, showAll }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {guess.map(({ id, letter, isCorrect }) => (
        <p key={id} className='border-b-2 border-primary-900 text-primary-900 text-2xl md:text-4xl md:pb-1 px-2 min-h-[2rem] min-w-[2rem] text-center'>
          {(showAll || isCorrect) && letter.toUpperCase()}
        </p>
      ))}
    </div>
  );
}
