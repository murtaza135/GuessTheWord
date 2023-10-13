import Container from '@/ui/containers/Container';
import { useRouteError } from 'react-router-dom';
import { isRouteErrorResponse } from 'react-router-dom';
import Button from '@/ui/buttons/Button';
import Card from '@/ui/cards/Card';
import { Link } from 'react-router-dom';
import Title from '@/ui/Title';

export default function ErrorRouteLayout() {
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
