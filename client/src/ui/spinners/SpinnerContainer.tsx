import Container from '../containers/Container';
import Spinner from './Spinner';

export default function SpinnerContainer() {
  return (
    <Container $variant='center' className='px-4 py-24'>
      <Spinner />
    </Container>
  );
}
