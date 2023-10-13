import { LetterDisplay } from '@/features/guess-game/components/displays/LetterDisplay';
import { GuessWord } from '@/features/guess-game/types';

type Props = {
  guess: GuessWord[];
  showAll?: boolean;
};

export function GuessDisplay({ guess, showAll }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {guess.map(({ id, letter, isCorrect }) => (
        <LetterDisplay key={id} show={showAll || isCorrect} value={letter} />
      ))}
    </div>
  );
}
