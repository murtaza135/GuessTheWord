import { useState, useMemo, useCallback } from 'react';
import randomWord from '@/utils/words/randomWord';
import Letter from '@/types/Letter';
import GuessWord from '@/types/GuessWord';

function generateRandomGuessWord(): GuessWord[] {
  return [...randomWord()].map((letter, index) => ({
    id: index,
    letter: letter.toUpperCase() as Letter,
    isCorrect: false,
  }));
}

export default function useGuessWord() {
  const [word, setWord] = useState(() => generateRandomGuessWord());
  const isWordCorrect = useMemo(() => word.every((value) => value.isCorrect), [word]);

  const resetWord = useCallback(() => setWord(generateRandomGuessWord()), []);

  const guessLetterInWord = useCallback((letter: Letter) => {
    const updatedWord = word.map((value) => {
      return value.letter.toUpperCase() === letter.toUpperCase()
        ? { ...value, isCorrect: true }
        : value;
    });

    setWord(updatedWord);

    return {
      isLetterCorrect: updatedWord
        .filter((value) => value.letter.toUpperCase() === letter.toUpperCase())
        .length > 0,
      isWordCorrect: updatedWord.every((value) => value.isCorrect)
    };
  }, [word]);

  return { word, isWordCorrect, resetWord, guessLetterInWord } as const;
}