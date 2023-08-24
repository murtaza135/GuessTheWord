import Stat from '../../../ui/stats/Stat';
import { RxCheck } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import Avatar from '../../../ui/avatars/Avatar';
import { Link } from 'react-router-dom';
import useProfile from '@/features/auth/hooks/useProfile';
import Container from '@/ui/containers/Container';

export default function Navbar() {
  const { data } = useProfile();

  return (
    <nav className='fixed w-full py-6 -z-10'>
      <Container className="flex justify-around items-center">
        <p className='hidden md:block text-3xl text-primary-900 bg-white px-2.5 pt-0.5 rounded-full aspect-square'>G</p>
        <div className='flex gap-8'>
          <Stat value='9999' icon={<TiTimes />} color='red' />
          <Stat value='9999' icon={<RxCheck />} color='green' />
        </div>
        <Link to='/account'>
          <Avatar alt={data?.name ?? 'Avatar'} src={data?.image} fallback={data?.name} />
        </Link>
      </Container>
    </nav>
  );
}
