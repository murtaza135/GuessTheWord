import { useState } from 'react';
import Card from '@/components/Card';
import Letter from '@/components/Letter';
import LetterDisplay from '@/components/LetterDisplay';
import Text from '@/components/Text';
import letters from '@/utils/letters';
import useGuessWord from '@/hooks/useGuessWord';
import { NUM_TRIES } from '@/config/constants';
import LetterValue from '@/types/Letter';
import useIncrement from '@/hooks/useIncrement';

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
        <div className="flex gap-1 flex-wrap justify-center">
          {guess.map(({ id, guess, letter }) => (
            <LetterDisplay key={id} show={guess} value={letter} />
          ))}
        </div>

        {import.meta.env.DEV && (
          <div className='flex gap-1 mt-2 text-slate-700'>
            <Text>Word: </Text>
            <Text>{guess.map((value) => value.letter).join('').toLowerCase()}</Text>
          </div>
        )}

        <div className='flex gap-1'>
          <Text>Incorrect Guesses: </Text>
          <Text>{numGuesses}/{NUM_TRIES}</Text>
        </div>

        <div className="flex gap-1 flex-wrap justify-center">
          {letters.map((letter) => <Letter key={letter} value={letter} onClick={handleLetterClick} />)}
        </div>
      </Card>
    </div>
  );
}
