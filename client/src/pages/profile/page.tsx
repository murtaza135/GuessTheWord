import Card from '@/ui/cards/Card';
import { useProfile } from '@/features/auth';
import Avatar from '@/ui/avatars/Avatar2';
import { GithubButton, GoogleButton, GuessButton } from '@/features/auth';
import TextGroup from '@/ui/text/TextGroup';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import Button from '@/ui/buttons/Button';
import { useLogout } from '@/features/auth';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { data } = useProfile();
  const { mutate } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(null);
    navigate('/login');
  };

  return (
    <Card className='flex flex-col justify-center items-center gap-8 w-full max-w-md'>
      <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Profile</p>

      <div className='flex flex-col w-full gap-8 items-center border-[1px] p-8 rounded-md border-gray-300'>
        <Avatar alt={data?.name ?? 'Profile'} src={data?.image} fallback={data?.name} />

        <div className="flex flex-col w-full gap-4">
          <TextGroup label='Name' icon={<BsPersonCircle />}>{data?.name || 'N/A'}</TextGroup>
          <TextGroup label='Email' icon={<AiOutlineMail />}>{data?.email || 'N/A'}</TextGroup>
          <TextGroup label='Username' icon={<BsPerson />}>{data?.name || 'N/A'}</TextGroup>
        </div>
      </div>

      <div className='flex flex-col w-full justify-center items-center gap-4 border-[1px] p-8 rounded-md border-gray-300'>
        <p className='text-sm text-primary-900 font-semibold'>Your connections</p>
        <div className='flex gap-5'>
          <GuessButton isAuthorized={false} />
          <GithubButton isAuthorized={false} />
          <GoogleButton isAuthorized={false} />
        </div>
      </div>

      <Button className='w-full' onClick={handleLogout}>Logout</Button>
    </Card>
  );
}
