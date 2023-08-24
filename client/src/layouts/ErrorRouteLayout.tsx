import Container from '@/ui/containers/Container';
import ErrorPage from '@/pages/error/page';

export default function ErrorRouteLayout() {
  return (
    <Container variant='center' className='px-4 py-24'>
      <ErrorPage />
    </Container>
  );
}
