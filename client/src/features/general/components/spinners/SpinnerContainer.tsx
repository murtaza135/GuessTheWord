import { Container } from '@/features/general/components/Container';
import { Spinner } from './Spinner';

export function SpinnerContainer() {
  return (
    <Container $variant='center' className='px-4 py-24'>
      <Spinner />
    </Container>
  );
}
