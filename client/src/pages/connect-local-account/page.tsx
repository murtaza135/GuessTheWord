import Card from '@/ui/cards/Card';
import { ConnectLocalAccountForm } from '@/features/auth';

export default function ConnectLocalAccountPage() {
  return (
    <Card className='flex flex-col items-center gap-10 w-full max-w-sm'>
      <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Create and Link a Guess Account</p>
      <ConnectLocalAccountForm />
    </Card>
  );
}
