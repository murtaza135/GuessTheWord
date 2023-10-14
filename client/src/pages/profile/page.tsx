import { useNavigate } from 'react-router-dom';
import { config } from '@/app/config';
import { useStore } from '@/app/store';
import { Card } from '@/features/general/components/Card';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { useAccounts } from '@/features/auth/hooks/useAccounts';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { GithubButton } from '@/features/auth/components/GithubButton';
import { GoogleButton, } from '@/features/auth/components/GoogleButton';
import { GuessButton } from '@/features/auth/components/GuessButton';
import { BigAvatar } from '@/features/general/components/avatars/BigAvatar';
import { TextGroup } from '@/features/general/components/TextGroup';
import { Button } from '@/features/general/components/Button';
import { Spinner } from '@/features/general/components/spinners/Spinner';
import { Title } from '@/features/general/components/Title';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";

export default function ProfilePage() {
  const { data: profile, isLoading: isProfileLoading } = useProfile();
  const { data: accounts, isLoading: isAccountsLoading } = useAccounts();
  const isLoading = isProfileLoading || isAccountsLoading;
  const { logout } = useLogout();
  const navigate = useNavigate();
  const isGuestMode = useStore.use.isGuestMode();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isGuestMode && isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Title title='Profile' />
      <Card className='flex flex-col justify-center items-center gap-8 w-full max-w-md'>
        <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Profile</p>

        <div className='flex flex-col w-full gap-8 items-center border-[1px] p-8 rounded-md border-gray-300'>
          <BigAvatar alt={profile?.name ?? 'Profile'} src={profile?.image} fallback={profile?.name} />

          <div className="flex flex-col w-full gap-4">
            <TextGroup label='Name' icon={<BsPersonCircle />}>{profile?.name || 'N/A'}</TextGroup>
            <TextGroup label='Email' icon={<AiOutlineMail />}>{profile?.email || 'N/A'}</TextGroup>
            {accounts?.localAccount && (
              <TextGroup label='Username' icon={<BsPerson />}>
                {accounts.localAccount.username || 'N/A'}
              </TextGroup>
            )}
          </div>
        </div>

        {!isGuestMode && (
          <div className='flex flex-col w-full justify-center items-center gap-4 border-[1px] p-8 rounded-md border-gray-300'>
            <p className='text-sm text-primary-900 font-semibold'>Your linked accounts</p>
            <div className='flex gap-5'>
              <GuessButton to='/accounts/link/guess' isAuthorized={!!accounts?.localAccount} />
              <GithubButton to={`${config.VITE_API_URL}/auth/github/link`} isAuthorized={!!accounts?.oAuthAccounts.find((account) => account.provider === 'github')} />
              <GoogleButton to={`${config.VITE_API_URL}/auth/google/link`} isAuthorized={!!accounts?.oAuthAccounts.find((account) => account.provider === 'google')} />
            </div>
          </div>
        )}

        <Button className='w-full' onClick={handleLogout}>Logout</Button>
      </Card>
    </>
  );
}
