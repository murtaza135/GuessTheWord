import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Container } from '@/features/general/components/Container';
import { Button } from '@/features/general/components/Button';
import { Card } from '@/features/general/components/Card';
import { Title } from '@/features/general/components/Title';

export function ErrorRouteLayout() {
  const error = useRouteError();
  const isPageNotFoundError = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Container $variant='center' className='px-4 py-24'>
      <Title title={isPageNotFoundError ? '404' : 'Error'} />
      <Card className='flex flex-col gap-10 items-center'>
        <div className='flex flex-col gap-3'>
          <p className='text-center text-primary-900 font-bold text-5xl md:text-5xl'>
            {isPageNotFoundError ? '404' : 'Error'}
          </p>
          <p className='text-center text-primary-900 font-bold text-2xl md:text-2xl'>
            {isPageNotFoundError ? 'Page not found' : 'Something went wrong'}
          </p>
        </div>
        <Link to="/"><Button>Main Menu</Button></Link>
      </Card>
    </Container>
  );
}
