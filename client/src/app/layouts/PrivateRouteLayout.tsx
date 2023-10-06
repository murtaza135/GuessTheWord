import { useProfile } from '@/features/auth';
import Spinner from '@/ui/spinners/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from '@/ui/containers/Container';
import { Navbar } from '@/features/navbar';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function PrivateRouteLayout() {
  const { isLoading, isSuccess, error } = useProfile();

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(
        error?.message ?? 'Something went wrong',
        { id: 'private-route-layout' },
      );
    }
  }, [error, isLoading]);

  return (
    <>
      {isLoading && (
        <Container $variant='center' className='px-4 py-24'>
          <Spinner />
        </Container>
      )}

      {error && <Navigate to="/login" replace />}

      {isSuccess && (
        <>
          <Navbar />
          <Container $variant='center' className='px-4 pt-36 pb-24'>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}
