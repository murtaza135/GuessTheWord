import { useProfile } from '@/features/auth';
import Container from '@/ui/containers/Container';
import Spinner from '@/ui/spinners/Spinner';
import { Navigate } from 'react-router-dom';

export default function HomePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Container $variant='center' className='px-4 py-24'>
        <Spinner />
      </Container>
    );
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate to="/main-menu" replace />
  );
}
