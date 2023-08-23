import IconText from '../../../ui/text/IconText';
import { RxCheck } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import Avatar from '../../../ui/avatars/Avatar';
import { Link } from 'react-router-dom';
import useProfile from '@/features/auth/hooks/useProfile';

export default function Navbar() {
  const { data } = useProfile();

  return (
    <nav className='fixed container mx-auto w-full flex justify-around items-center py-6 '>
      <p className='hidden md:block text-3xl text-primary-900 bg-white px-2.5 pt-0.5 rounded-full aspect-square'>G</p>
      <div className='flex gap-8'>
        <IconText text='9999' icon={<TiTimes />} className='bg-red-600 text-white' />
        <IconText text='9999' icon={<RxCheck />} className='bg-green-400' />
      </div>
      <Link to='/account'>
        <Avatar alt={data?.name ?? 'Avatar'} src={data?.image} fallback={data?.name} />
      </Link>
    </nav>
  );
}
