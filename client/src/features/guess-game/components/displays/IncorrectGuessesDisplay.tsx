import config from '@/config/config';

type Props = {
  value: number;
};

export default function IncorrectGuessesDisplay({ value }: Props) {
  return (
    <div className='flex gap-1'>
      <p className='md:text-lg font-semibold text-center'>Incorrect Guesses: </p>
      <p className='md:text-lg font-semibold text-center'>{value}/{config.NUM_TRIES}</p>
    </div>
  );
}
