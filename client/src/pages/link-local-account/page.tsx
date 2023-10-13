import Card from '@/ui/cards/Card';
import { LinkLocalAccountForm } from '@/features/auth';
import Title from '@/ui/Title';

export default function LinkLocalAccountPage() {
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
