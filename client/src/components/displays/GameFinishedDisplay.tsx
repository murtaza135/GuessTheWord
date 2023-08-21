import Button from '@/components/ui/buttons/Button';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import useWinsQuery from '@/hooks/useWinsQuery';
import useLossesQuery from '@/hooks/useLossesQuery';

type Props = {
  isWin: boolean;
  onPlayAgain?: () => void;
};

export default function GameFinishedDisplay({ isWin, onPlayAgain }: Props) {
  const { wins } = useWinsQuery();
  const { losses } = useLossesQuery();

  return (
    <div className='flex flex-col gap-6 text-center'>
      {isWin
        ? <Text className='text-green-600 text-3xl md:text-4xl'>You Win!</Text>
        : <Text className='text-red-700 text-3xl md:text-4xl'>You Lost!</Text>
      }

      <div>
        <Text className='text-green-700 font-bold text-xl md:text-xl'>Wins: {wins || '...'}</Text>
        <Text className='text-red-800 font-bold text-xl md:text-xl'>Losses: {losses || '...'}</Text>
      </div>

      <div className='flex gap-3'>
        <Button onClick={onPlayAgain}>Play Again?</Button>
        <Link to="/">
          <Button>Main Menu</Button>
        </Link>
      </div>
    </div>
  );
}
