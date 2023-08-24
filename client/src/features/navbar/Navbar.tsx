import Stat from '@/ui/stats/Stat';
import { RxCheck } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import Avatar from '@/ui/avatars/Avatar';
import { Link } from 'react-router-dom';
import useProfile from '@/features/auth/hooks/useProfile';
import Container from '@/ui/containers/Container';
import { useLocation } from 'react-router-dom';
import icon from "/images/icon.png";

export default function Navbar() {
  const location = useLocation();
  const isPlayingGame = location.pathname === '/play';
  const { data } = useProfile();

  return (
    <nav className='absolute w-full py-6'>
      <Container className="flex justify-around items-center">
        <div className='flex gap-8'>
          {!isPlayingGame
            ? (
              <Link to='/' className='hover:opacity-75 transition-opacity bg-white rounded-full'>
                <img src={icon} alt="Guess! Icon" width={40} />
              </Link>
            )
            : (
              <>
                <Stat value='9999' icon={<TiTimes />} color='red' />
                <Stat value='9999' icon={<RxCheck />} color='green' />
              </>
            )}
        </div>
        <Link to='/account'>
          <Avatar alt={data?.name ?? 'Avatar'} src={data?.image} fallback={data?.name} />
        </Link>
      </Container>
    </nav>
  );
}
