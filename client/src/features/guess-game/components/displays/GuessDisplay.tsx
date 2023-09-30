import LetterDisplay from './LetterDisplay';
import GuessWord from '@/types/GuessWord';

type Props = {
  guess: GuessWord[];
  showAll?: boolean;
};

export default function GuessDisplay({ guess, showAll }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {guess.map(({ id, letter, isCorrect }) => (
        <LetterDisplay key={id} show={showAll || isCorrect} value={letter} />
      ))}
    </div>
  );
}
