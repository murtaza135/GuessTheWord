import Text from './Text';
import { NUM_TRIES } from '@/config/constants';

type Props = {
  value: number;
};

export default function IncorrectGuessesDisplay({ value }: Props) {
  return (
    <div className='flex gap-1'>
      <Text>Incorrect Guesses: </Text>
      <Text>{value}/{NUM_TRIES}</Text>
    </div>
  );
}
