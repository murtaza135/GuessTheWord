import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { Link } from 'react-router-dom';

type Props = {
  isWin: boolean;
  onPlayAgain?: () => void;
};

export default function GameFinishedDisplay({ isWin, onPlayAgain }: Props) {
  return (
    <div className='flex flex-col gap-6 text-center'>
      {isWin
        ? <Text className='text-green-600 text-3xl md:text-4xl'>You Win!</Text>
        : <Text className='text-red-700 text-3xl md:text-4xl'>You Lost!</Text>
      }
      <div className='flex gap-3'>
        <Button onClick={onPlayAgain}>Play Again?</Button>
        <Link to="/">
          <Button>Main Menu</Button>
        </Link>
      </div>
    </div>
  );
}
