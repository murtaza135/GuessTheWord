import { Outlet } from 'react-router-dom';
import { Container } from '@/features/general/components/Container';

export function PublicRouteLayout() {
  return (
    <Container $variant='center' className='px-4 py-24'>
      <Outlet />
    </Container>
  );
}
