import { useState, useMemo, useCallback } from 'react';
import randomWord from '@/utils/words/randomWord';
import Letter from '@/types/Letter';

type Guess = {
  id: number;
  letter: Letter;
  guess: boolean;
};

function randomGuess(): Guess[] {
  return [...randomWord()].map((letter, index) => ({ letter: letter.toUpperCase() as Letter, guess: false, id: index }));
}

export default function useGuessWord() {
  const [guess, setGuess] = useState(() => randomGuess());
  const isGuessCorrect = useMemo(() => guess.every((value) => value.guess), [guess]);

  const resetWord = useCallback(() => setGuess(randomGuess()), []);

  const updateGuessWithLetter = useCallback((letter: Letter) => {
    const updatedGuess = guess.map((value): Guess => {
      return value.letter.toUpperCase() === letter.toUpperCase()
        ? { ...value, guess: true }
        : value;
    });

    setGuess(updatedGuess);

    const isCorrectLetter = updatedGuess.filter((value) => value.letter.toUpperCase() === letter.toUpperCase()).length > 0;
    return isCorrectLetter;
  }, [guess]);

  return { guess, isGuessCorrect, resetWord, updateGuessWithLetter } as const;
}