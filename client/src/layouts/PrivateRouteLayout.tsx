import { useProfile } from '@/features/auth';
import Spinner from '@/ui/spinners/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import Container from '@/ui/containers/Container';
import { Navbar } from '@/features/navbar';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function PrivateRouteLayout() {
  const location = useLocation();
  const { error, isLoading } = useProfile();

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(error?.message ?? 'Something went wrong');
    }
  }, [error, isLoading]);

  if (isLoading) {
    return (
      <Container variant='center' className='px-4 py-24'>
        <Spinner />
      </Container>
    );
  }

  // TODO is state needed?
  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      <Container variant='center' className='px-4 pt-36 pb-24'>
        <Outlet />
      </Container>
    </>
  );
}
