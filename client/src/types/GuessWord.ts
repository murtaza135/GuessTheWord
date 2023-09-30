import Letter from '@/types/Letter';

type GuessWord = {
  id: number;
  letter: Letter;
  isCorrect: boolean;
};

export default GuessWord;