import { useState, useMemo, useCallback } from 'react';
import { randomWord } from '@/features/guess-game/utils/randomWord';
import { Letter, LetterData } from '@/features/guess-game/types';

function generateRandomWordInLetterDataForm(): LetterData[] {
  return [...randomWord()].map((letter, index) => ({
    id: index,
    letter: letter.toUpperCase() as Letter,
    isCorrect: false,
  }));
}

export function useGuessWord() {
  const [word, setWord] = useState(() => generateRandomWordInLetterDataForm());
  const isWordCorrect = useMemo(() => word.every((value) => value.isCorrect), [word]);

  const resetWord = useCallback(() => setWord(generateRandomWordInLetterDataForm()), []);

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