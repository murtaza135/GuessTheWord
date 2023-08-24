import Card from '@/ui/cards/Card';
import useProfile from '@/features/auth/hooks/useProfile';

export default function AccountPage() {
  const { data } = useProfile();

  return (
    <Card className='break-all'>
      {JSON.stringify(data)}
    </Card>
  );
}
