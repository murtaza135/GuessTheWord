import { Link } from 'react-router-dom';
import { Card } from '@/features/general/components/Card';
import { config } from '@/app/config';
import { useGuessWord } from '@/features/guess-game/hooks/useGuessWord';
import { Keyboard } from '@/features/guess-game/components/keyboard/Keyboard';
import { CurrentGuess } from '@/features/guess-game/components/CurrentGuess';
import { GameData } from '@/features/guess-game/components/GameData';
import { WinLossData } from '@/features/guess-game/components/WinLossData';
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
      <CurrentGuess guess={word} showAll={isGameOver} />

      {!isGameOver
        ? (
          <>
            <GameData guess={word} incorrectGuesses={numGuesses} />
            <Keyboard onClick={handleLetterClick} />
          </>
        )
        : <WinLossData isWin={isWordCorrect} />
      }

      <div className="flex gap-3">
        <Link to="/"><Button>Main Menu</Button></Link>
        <Button onClick={handlePlayAgain}>
          {!isGameOver ? 'Reset' : 'Play Again?'}
        </Button>
      </div>
    </Card>
  );
}
