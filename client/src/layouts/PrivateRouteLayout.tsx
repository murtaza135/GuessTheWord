import useProfile from '@/features/auth/hooks/useProfile';
import Spinner from '@/ui/spinners/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import Container from '@/ui/containers/Container';
import Navbar from '@/features/navbar/components/Navbar';

export default function PrivateRouteLayout() {
  const location = useLocation();
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Container variant='center' className='px-4 py-24'>
        <Spinner />
      </Container>
    );
  }

  if (!data) return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <>
      <Navbar />
      <Container variant='center' className='px-4 pt-36 pb-24'>
        <Outlet />
      </Container>
    </>
  );
}
