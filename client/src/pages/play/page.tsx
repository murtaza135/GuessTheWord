import { Link } from 'react-router-dom';
import { Card } from '@/features/general/components/Card';
import { config } from '@/app/config';
import { useGuessWord } from '@/features/guess-game/hooks/useGuessWord';
import { Keyboard } from '@/features/guess-game/components/keyboard/Keyboard';
import { IncorrectGuessesDisplay } from '@/features/guess-game/components/displays/IncorrectGuessesDisplay';
import { GuessDisplay } from '@/features/guess-game/components/displays/GuessDisplay';
import { GameFinishedDisplay } from '@/features/guess-game/components/displays/GameFinishedDisplay';
import { AnswerDisplay } from '@/features/guess-game/components/displays/AnswerDisplay';
import { useIncrementWins } from '@/features/win-loss/hooks/useIncrementWins';
import { useIncrementLosses } from '@/features/win-loss/hooks/useIncrementLosses';
import { useIncrement } from '@/features/general/hooks/useIncrement';
import { Button } from '@/features/general/components/Button';
import { Letter } from '@/features/guess-game/types';

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
