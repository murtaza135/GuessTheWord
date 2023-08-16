import Letter from '@/types/Letter';

type Guess = {
  id: number;
  letter: Letter;
  guess: boolean;
};

export default Guess;