import Card from '@/features/ui/Card';
import Letter from '@/features/ui/Letter';
import LetterDisplay from '@/features/ui/LetterDisplay';
import Text from '@/features/ui/Text';

export default function PlayPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card>
        <Letter value='A' />
        <LetterDisplay value='A' />
        <Text>Hello World</Text>
      </Card>
    </div>
  );
}
