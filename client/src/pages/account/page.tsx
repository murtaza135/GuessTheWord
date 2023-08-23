import Card from '@/ui/cards/Card';
import useProfile from '@/features/auth/hooks/useProfile';

export default function AccountPage() {
  const { data } = useProfile();

  return (
    <div className='h-full flex flex-col items-center justify-center py-10 mx-4'>
      <Card className='break-all'>
        {JSON.stringify(data)}
      </Card>
    </div>
  );
}
