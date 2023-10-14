import { Navigate } from 'react-router-dom';
import { useAccounts } from '@/features/auth/hooks/useAccounts';
import { LinkLocalAccountForm } from '@/features/auth/components/LinkLocalAccountForm';
import { Card } from '@/features/general/components/Card';
import { Title } from '@/features/general/components/Title';

export default function LinkLocalAccountPage() {
  const { data } = useAccounts();
  const hasLocalAccount = !!data?.localAccount;

  if (hasLocalAccount) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <Title title='Link Guess Account' />
      <Card className='flex flex-col items-center gap-10 w-full max-w-sm'>
        <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Create and Link a Guess Account</p>
        <LinkLocalAccountForm />
      </Card>
    </>
  );
}
