import Card from '@/ui/cards/Card';
import Text from '@/ui/text/Text';
import Button from '@/ui/buttons/Button';
import { Link } from 'react-router-dom';
import useWinsQuery from '@/features/win-loss/hooks/useWinsQuery';
import useLossesQuery from '@/features/win-loss/hooks/useLossesQuery';

export default function MainMenuPage() {
  const { wins } = useWinsQuery();
  const { losses } = useLossesQuery();

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-10 items-center'>
        <Text className='text-primary-900 font-bold text-4xl md:text-4xl'>Guess the Word!</Text>
        <div className='flex flex-col gap-2 items-center'>
          <Text className='text-green-700 font-bold text-2xl md:text-2xl'>Wins: {wins || '...'}</Text>
          <Text className='text-red-800 font-bold text-2xl md:text-2xl'>Losses: {losses || '...'}</Text>
        </div>
        <Link to="/play" className='w-full mt-1'>
          <Button size='lg' className='w-full'>Play</Button>
        </Link>
      </Card>
    </div>
  );
}
