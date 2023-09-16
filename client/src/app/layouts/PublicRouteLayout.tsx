import { Outlet } from 'react-router-dom';
import Container from '@/ui/containers/Container';

export default function PublicRouteLayout() {
  return (
    <Container $variant='center' className='px-4 py-24'>
      <Outlet />
    </Container>
  );
}
