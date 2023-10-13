import { useWinLoss } from '@/features/win-loss/hooks/useWinLoss';

type Props = {
  isWin: boolean;
};

export function WinLossData({ isWin }: Props) {
  const { wins, losses } = useWinLoss();

  return (
    <div className='flex flex-col gap-6 text-center'>
      {isWin
        ? <p className='font-semibold text-center text-green-600 text-3xl md:text-4xl'>You Win!</p>
        : <p className='font-semibold text-center text-red-700 text-3xl md:text-4xl'>You Lost!</p>
      }

      {/* TODO change the '...' */}
      <div>
        <p className='text-center text-green-700 font-bold text-xl md:text-xl'>Wins: {wins ?? '...'}</p>
        <p className='text-center text-red-800 font-bold text-xl md:text-xl'>Losses: {losses ?? '...'}</p>
      </div>
    </div>
  );
}
