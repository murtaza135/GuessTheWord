import { useState, useMemo, useCallback } from 'react';
import randomWord from '@/utils/words/randomWord';
import { useList } from "react-use";
import Letter from '@/types/Letter';
import keys from "lodash/keys";
import pickBy from "lodash/pickBy";

export default function useGuessWord() {
  const initialWord = useMemo(() => randomWord(), [])!;
  const [word, setWord] = useState(initialWord);
  const [guess, { set: setGuess, updateAt }] = useList<boolean>(new Array<boolean>(initialWord.length).fill(false));

  const resetWord = useCallback(() => {
    const newWord = randomWord();
    setWord(newWord);
    setGuess(new Array<boolean>(newWord.length).fill(false));
  }, []);

  const updateGuessWithLetter = useCallback((letter: Letter) => {
    const indexes = keys(pickBy(word, letter))
      .map((value) => Number(value));
    indexes.forEach((index) => updateAt(index, true));
  }, [word]);

  const isGuessCorrect = useCallback(() => {
    return !guess.some((value) => !value);
  }, [guess]);

  return [word, { resetWord, updateGuessWithLetter, isGuessCorrect }] as const;
}