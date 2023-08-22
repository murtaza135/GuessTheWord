import Card from '@/components/ui/cards/Card';
import useGuessWord from '@/hooks/useGuessWord';
import Letter from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';
import Keyboard from '@/components/keyboard/Keyboard';
import IncorrectGuessesDisplay from '@/components/displays/IncorrectGuessesDisplay';
import AnswerDisplay from '@/components/displays/AnswerDisplay';
import GuessDisplay from '@/components/displays/GuessDisplay';
import GameFinishedDisplay from '@/components/displays/GameFinishedDisplay';
import { NUM_TRIES } from '@/config/constants';
import Button from '@/components/ui/buttons/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getLosses, getWins } from '@/app/api/old-api';
import useWinsMutation from '@/hooks/useWinsMutation';
import useLossesMutation from '@/hooks/useLossesMutation';

export default function PlayPage() {
  const queryClient = useQueryClient();
  const { guess, isGuessCorrect, updateGuessWithLetter, resetWord } = useGuessWord();
  const [numGuesses, incrementNumGuesses, resetNumGuesses] = useIncrement(0);
  const isGameOver = isGuessCorrect || numGuesses >= NUM_TRIES;
  const { mutate: mutateWins } = useWinsMutation();
  const { mutate: mutateLosses } = useLossesMutation();

  useEffect(() => {
    if (isGameOver) {
      if (isGuessCorrect) {
        queryClient.ensureQueryData<number>(['wins'], { queryFn: getWins })
          .then((wins) => mutateWins(wins + 1))
          .catch((error) => console.log(error));
      } else {
        queryClient.ensureQueryData<number>(['losses'], { queryFn: getLosses })
          .then((losses) => mutateLosses(losses + 1))
          .catch((error) => console.log(error));
      }
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
              <div className="flex gap-3 flex-1">
                <Button onClick={handlePlayAgain}>Reset</Button>
                <Link to="/"><Button>Main Menu</Button></Link>
              </div>
            </>
          )
        }
      </Card>
    </div>
  );
}
