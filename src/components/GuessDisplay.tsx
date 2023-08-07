import LetterDisplay from './LetterDisplay';
import Guess from '@/types/Guess';

type Props = {
  guess: Guess[];
};

export default function GuessDisplay({ guess }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {guess.map(({ id, guess, letter }) => (
        <LetterDisplay key={id} show={guess} value={letter} />
      ))}
    </div>
  );
}
