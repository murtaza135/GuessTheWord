import Button from '@/ui/buttons/Button';
import Card from '@/ui/cards/Card';
import { Link } from 'react-router-dom';
import Title from '@/ui/Title';

export default function ErrorPage() {
  return (
    <>
      <Title title='Error' />
      <Card className='flex flex-col gap-10 items-center'>
        <div className='flex flex-col gap-3'>
          <p className='text-center text-primary-900 font-bold text-5xl md:text-5xl'>404</p>
          <p className='text-center text-primary-900 font-bold text-2xl md:text-2xl'>Page Not Found</p>
        </div>
        <Link to="/"><Button>Main Menu</Button></Link>
      </Card>
    </>
  );
}
