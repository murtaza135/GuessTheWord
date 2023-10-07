import { useProfile } from '@/features/auth';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from '@/ui/containers/Container';
import { Navbar } from '@/features/navbar';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import SpinnerContainer from '@/ui/spinners/SpinnerContainer';

export default function PrivateRouteLayout() {
  const { error, isLoading } = useProfile();
  const isErrorRelatedToOffline = error instanceof TypeError;

  useEffect(() => {
    if (!isLoading && error && !isErrorRelatedToOffline) {
      toast.error(
        error?.message ?? 'Something went wrong',
        { id: 'private-route-layout' },
      );
    }
  }, [isLoading, error, isErrorRelatedToOffline]);

  if (isLoading) {
    return <SpinnerContainer />;
  }

  if (error && !isErrorRelatedToOffline) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Container $variant='center' className='px-4 pt-36 pb-24'>
        <Outlet />
      </Container>
    </>
  );
}
