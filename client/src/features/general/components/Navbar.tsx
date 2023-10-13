import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { useWinLoss } from '@/features/win-loss/hooks/useWinLoss';
import { Stat } from '@/features/general/components/Stat';
import { Avatar } from '@/features/general/components/avatars/Avatar';
import { Container } from '@/features/general/components/Container';
import { RxCheck } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import icon from "/images/icon.svg";

export function Navbar() {
  const location = useLocation();
  const isPlayingGame = location.pathname === '/play';
  const { data } = useProfile();
  const { wins, losses } = useWinLoss();

  return (
    <nav className='absolute w-full py-6'>
      <Container className="flex justify-around items-center">
        <div className='flex gap-8'>
          {!isPlayingGame
            ? (
              <Link to='/' className='hover:opacity-75 transition-opacity bg-white rounded-full w-10 h-10'>
                <img src={icon} alt="Guess!" />
              </Link>
            )
            : (
              <>
                {/* TODO find a better alternative than '?? 0' */}
                <Stat value={losses ?? 0} icon={<TiTimes />} $color='red' />
                <Stat value={wins ?? 0} icon={<RxCheck />} $color='green' />
              </>
            )}
        </div>
        <Link to='/profile'>
          <Avatar alt={data?.name ?? 'Avatar'} src={data?.image} fallback={data?.name} />
        </Link>
      </Container>
    </nav>
  );
}
