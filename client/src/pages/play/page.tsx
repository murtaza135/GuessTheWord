import Card from '@/ui/cards/Card';
import Letter from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';
import { useGuessWord, Keyboard, IncorrectGuessesDisplay, AnswerDisplay, GuessDisplay, GameFinishedDisplay } from '@/features/guess-game';
import config from '@/config/config';
import Button from '@/ui/buttons/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useIncrementWins, useIncrementLosses } from '@/features/win-loss';

export default function PlayPage() {
  const { guess, isGuessCorrect, updateGuessWithLetter, resetWord } = useGuessWord();
  const [numGuesses, incrementNumGuesses, resetNumGuesses] = useIncrement(0);
  const isGameOver = isGuessCorrect || numGuesses >= config.NUM_TRIES;
  const { incrementWins } = useIncrementWins();
  const { incrementLosses } = useIncrementLosses();

  useEffect(() => {
    if (isGameOver) {
      if (isGuessCorrect) incrementWins({ wins: 1 });
      else incrementLosses({ losses: 1 });
    }
  }, [isGameOver, isGuessCorrect]);

  const handleLetterClick = (letter: Letter) => {
    const isCorrect = updateGuessWithLetter(letter);
    if (!isCorrect) incrementNumGuesses();
  };

  const handlePlayAgain = () => {
    resetWord();
    resetNumGuesses();
  };

  return (
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
            <div className="flex gap-3 flex-1">
              <Link to="/"><Button>Main Menu</Button></Link>
              <Button onClick={handlePlayAgain}>Reset</Button>
            </div>
          </>
        )
      }
    </Card>
  );
}
