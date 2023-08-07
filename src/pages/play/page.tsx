import Card from '@/components/ui/Card';
import useGuessWord from '@/hooks/useGuessWord';
import Letter from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';
import Keyboard from '@/components/keyboard/Keyboard';
import IncorrectGuessesDisplay from '@/components/displays/IncorrectGuessesDisplay';
import AnswerDisplay from '@/components/displays/AnswerDisplay';
import GuessDisplay from '@/components/displays/GuessDisplay';
import GameFinishedDisplay from '@/components/displays/GameFinishedDisplay';
import { NUM_TRIES } from '@/config/constants';
import Button from '@/components/ui/Button';

export default function PlayPage() {
  const { guess, isGuessCorrect, updateGuessWithLetter, resetWord } = useGuessWord();
  const [numGuesses, incrementNumGuesses, resetNumGuesses] = useIncrement(0);
  const isGameOver = isGuessCorrect || numGuesses >= NUM_TRIES;

  const handleLetterClick = (letter: Letter) => {
    const isCorrect = updateGuessWithLetter(letter);
    if (!isCorrect) incrementNumGuesses();
  };

  const handlePlayAgain = () => {
    resetWord();
    resetNumGuesses();
  };

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-8 items-center'>
        <GuessDisplay guess={guess} showAll={isGameOver} />

        {isGameOver
          ? <GameFinishedDisplay isWin={isGuessCorrect} onPlayAgain={handlePlayAgain} />
          : (
            <>
              <div className='flex flex-col gap-1 items-center'>
                {import.meta.env.DEV && <AnswerDisplay guess={guess} />}
                <IncorrectGuessesDisplay value={numGuesses} />
              </div>
              <Keyboard onClick={handleLetterClick} />
              <Button onClick={handlePlayAgain}>Reset</Button>
            </>
          )
        }
      </Card>
    </div>
  );
}
