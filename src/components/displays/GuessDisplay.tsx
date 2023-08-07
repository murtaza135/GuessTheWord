import LetterDisplay from './LetterDisplay';
import Guess from '@/types/Guess';

type Props = {
  guess: Guess[];
  showAll?: boolean;
};

export default function GuessDisplay({ guess, showAll }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {guess.map(({ id, guess, letter }) => (
        <LetterDisplay key={id} show={showAll || guess} value={letter} />
      ))}
    </div>
  );
}
