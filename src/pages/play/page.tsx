import Card from '@/components/Card';
import useGuessWord from '@/hooks/useGuessWord';
import LetterValue from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';
import Keyboard from '@/components/Keyboard';
import IncorrectGuessesDisplay from '@/components/IncorrectGuessesDisplay';
import AnswerDisplay from '@/components/AnswerDisplay';
import GuessDisplay from '@/components/GuessDisplay';

export default function PlayPage() {
  const { guess, isGuessCorrect, updateGuessWithLetter } = useGuessWord();
  const [numGuesses, incrementNumGuesses] = useIncrement(0);

  const handleLetterClick = (letter: LetterValue) => {
    const isCorrect = updateGuessWithLetter(letter);
    if (!isCorrect) incrementNumGuesses();
  };

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-6 items-center'>
        <GuessDisplay guess={guess} />
        {import.meta.env.DEV && <AnswerDisplay guess={guess} />}
        <IncorrectGuessesDisplay value={numGuesses} />
        <Keyboard onClick={handleLetterClick} />
      </Card>
    </div>
  );
}
