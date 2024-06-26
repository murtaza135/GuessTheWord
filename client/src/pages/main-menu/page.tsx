import { Link } from 'react-router-dom';
import { useWinLoss } from '@/features/win-loss/hooks/useWinLoss';
import { Card } from '@/features/general/components/Card';
import { Button } from '@/features/general/components/Button';

export default function MainMenuPage() {
  const { wins, losses } = useWinLoss();

  return (
    <Card className='flex flex-col gap-10 items-center'>
      <p className='text-center text-primary-900 font-bold text-4xl md:text-4xl'>Guess the Word!</p>
      <div className='flex flex-col gap-2 items-center'>
        <p className='text-center text-green-700 font-bold text-2xl md:text-2xl'>Wins: {wins ?? 'N/A'}</p>
        <p className='text-center text-red-800 font-bold text-2xl md:text-2xl'>Losses: {losses ?? 'N/A'}</p>
      </div>
      <Link to="/play" className='w-full mt-1'>
        <Button $size='lg' className='w-full'>Play</Button>
      </Link>
    </Card>
  );
}
