import Card from '@/ui/cards/Card';
import Letter from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';
import { useGuessWord, Keyboard, IncorrectGuessesDisplay, GuessDisplay, GameFinishedDisplay, AnswerDisplay } from '@/features/guess-game';
import config from '@/config/config';
import Button from '@/ui/buttons/Button';
import { Link } from 'react-router-dom';
import { useIncrementWins, useIncrementLosses } from '@/features/win-loss';

export default function PlayPage() {
  const { word, isWordCorrect, guessLetterInWord, resetWord } = useGuessWord();
  const [numGuesses, incrementNumGuesses, resetNumGuesses] = useIncrement(0);
  const isGameOver = isWordCorrect || numGuesses >= config.NUM_TRIES;
  const { incrementWins } = useIncrementWins();
  const { incrementLosses } = useIncrementLosses();

  const handleLetterClick = (letter: Letter) => {
    const { isLetterCorrect, isWordCorrect } = guessLetterInWord(letter);
    const isWordNotCorrect = !isLetterCorrect && (numGuesses + 1) >= config.NUM_TRIES;

    if (!isLetterCorrect) incrementNumGuesses();
    if (isWordCorrect) incrementWins({ wins: 1 });
    else if (isWordNotCorrect) incrementLosses({ losses: 1 });
  };

  const handlePlayAgain = () => {
    resetWord();
    resetNumGuesses();
  };

  return (
    <Card className='flex flex-col gap-8 items-center'>
      <GuessDisplay guess={word} showAll={isGameOver} />

      {isGameOver
        ? <GameFinishedDisplay isWin={isWordCorrect} onPlayAgain={handlePlayAgain} />
        : (
          <>
            <div className='flex flex-col gap-1 items-center'>
              {!config.PROD && <AnswerDisplay guess={word} />}
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
