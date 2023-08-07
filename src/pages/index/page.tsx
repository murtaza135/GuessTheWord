import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLosses, getWins } from '@/app/api/api';

export default function MainMenuPage() {
  const { data: numWins } = useQuery({
    queryKey: ['wins'],
    queryFn: getWins
  });

  const { data: numLosses } = useQuery({
    queryKey: ['losses'],
    queryFn: getLosses
  });

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-10 items-center'>
        <Text className='text-primary-900 font-bold  text-4xl md:text-4xl'>Guess the Word!</Text>
        <div className='flex flex-col gap-2 items-center'>
          <Text className='text-green-700 font-bold text-2xl md:text-2xl'>Wins: {numWins || '...'}</Text>
          <Text className='text-red-800 font-bold text-2xl md:text-2xl'>Losses: {numLosses || '...'}</Text>
        </div>
        <Link to="/play" className='w-full mt-1'>
          <Button className='w-full text-3xl px-2 py-3'>Play</Button>
        </Link>
      </Card>
    </div>
  );
}
