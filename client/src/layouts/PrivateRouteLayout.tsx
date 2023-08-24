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
  const { data, error, isLoading, isSuccess, isError, isLoadingError, isRefetchError } = useProfile();

  console.log('data:', data);
  console.log('isSuccess:', isSuccess);
  console.log('isError:', isError);
  console.log('isLoadingError:', isLoadingError);
  console.log('isRefetchError:', isRefetchError);

  useEffect(() => {
    if (!isLoading && (!data || error)) toast.error(error?.message ?? 'Something went wrong');
  }, [data, error, isLoading]);

  if (isLoading) {
    return (
      <Container variant='center' className='px-4 py-24'>
        <Spinner />
      </Container>
    );
  }

  if (!data || error) return <Navigate to="/login" state={{ from: location }} replace />;;

  return (
    <>
      <Navbar />
      <Container variant='center' className='px-4 pt-36 pb-24'>
        <Outlet />
      </Container>
    </>
  );
}
