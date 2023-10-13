import { config } from '@/app/config';
import { LetterData } from '@/features/guess-game/types';

type Props = {
  guess: LetterData[];
  incorrectGuesses: number;
};

export function GameData({ guess, incorrectGuesses }: Props) {
  const answer = guess.map((value) => value.letter).join('').toLowerCase();

  return (
    <div className='flex flex-col gap-1 items-center'>
      {/* display answer if not in production mode for debugging */}
      {!config.PROD && (
        <div className='flex gap-1 mt-2 text-slate-700'>
          <p className='font-semibold md:text-lg text-center'>Answer: </p>
          <p className='font-semibold md:text-lg text-center'>{answer}</p>
        </div>
      )}

      {/* display number of incorrect guesses */}
      <div className='flex gap-1'>
        <p className='md:text-lg font-semibold text-center'>Incorrect Guesses: </p>
        <p className='md:text-lg font-semibold text-center'>{incorrectGuesses}/{config.NUM_TRIES}</p>
      </div>
    </div>
  );
}
