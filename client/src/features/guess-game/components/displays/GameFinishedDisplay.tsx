import Button from '@/ui/buttons/Button';
import { Link } from 'react-router-dom';
import { useWinLoss } from '@/features/win-loss';

type Props = {
  isWin: boolean;
  onPlayAgain?: () => void;
};

export default function GameFinishedDisplay({ isWin, onPlayAgain }: Props) {
  const { wins, losses } = useWinLoss();

  return (
    <div className='flex flex-col gap-6 text-center'>
      {isWin
        ? <p className='font-semibold text-center text-green-600 text-3xl md:text-4xl'>You Win!</p>
        : <p className='font-semibold text-center text-red-700 text-3xl md:text-4xl'>You Lost!</p>
      }

      <div>
        <p className='text-center text-green-700 font-bold text-xl md:text-xl'>Wins: {wins ?? '...'}</p>
        <p className='text-center text-red-800 font-bold text-xl md:text-xl'>Losses: {losses ?? '...'}</p>
      </div>

      <div className='flex gap-3'>
        <Link to="/">
          <Button>Main Menu</Button>
        </Link>
        <Button onClick={onPlayAgain}>Play Again?</Button>
      </div>
    </div>
  );
}
