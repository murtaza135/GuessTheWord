import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Container } from '@/features/general/components/Container';
import { Navbar } from '@/features/general/components/Navbar';
import { SpinnerContainer } from '@/features/general/components/spinners/SpinnerContainer';
import { APIError } from '@/app/errors/APIError';

export function PrivateRouteLayout() {
  const { error, isLoading } = useProfile();
  const { logout } = useLogout();

  useEffect(() => {
    if (!isLoading && error && error instanceof APIError) {
      const message = error?.message ?? 'Something went wrong';
      toast.error(message, { id: 'private-route-layout' });
      logout();
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <SpinnerContainer />;
  }

  if (error && error instanceof APIError) {
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
