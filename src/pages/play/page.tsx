import Card from '@/features/ui/Card';
import Letter from '@/features/ui/Letter';
import LetterDisplay from '@/features/ui/LetterDisplay';
import Text from '@/features/ui/Text';
import LetterValue from '@/types/Letter';

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'] as LetterValue[];

export default function PlayPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-6 items-center'>
        <div className="flex gap-1 flex-wrap justify-center">
          <LetterDisplay value='A' />
        </div>

        <div className='flex gap-1'>
          <Text>Incorrect Guesses: </Text>
          <Text>5/6</Text>
        </div>

        <div className="flex gap-1 flex-wrap justify-center">
          {alphabet.map((letter) => <Letter value={letter} />)}
          <Letter value='A' />
        </div>
      </Card>
    </div>
  );
}
