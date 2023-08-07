import Card from '@/components/Card';
import Letter from '@/components/Letter';
import LetterDisplay from '@/components/LetterDisplay';
import Text from '@/components/Text';
import letters from '@/utils/letters';
import useGuessWord from '@/hooks/useGuessWord';
import LetterValue from "@/types/Letter";


export default function PlayPage() {
  const [word, { resetWord, isGuessCorrect, updateGuessWithLetter }] = useGuessWord();
  console.log(word.length);
  console.log(word);


  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-6 items-center'>
        <div className="flex gap-1 flex-wrap justify-center">
          {Array.from(word).map((letter) => <LetterDisplay key={letter} show={false} value={letter as LetterValue} />)}
        </div>

        <div className='flex gap-1'>
          <Text>Incorrect Guesses: </Text>
          <Text>5/6</Text>
        </div>

        <div className="flex gap-1 flex-wrap justify-center">
          {letters.map((letter) => <Letter value={letter} />)}
          <Letter value='A' />
        </div>
      </Card>
    </div>
  );
}
