import Text from '@/ui/text/Text';
import Button from '@/ui/buttons/Button';
import Card from '@/ui/cards/Card';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Card className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-3'>
        <Text className='text-primary-900 font-bold  text-5xl md:text-5xl'>404</Text>
        <Text className='text-primary-900 font-bold  text-2xl md:text-2xl'>Page Not Found</Text>
      </div>
      <Link to="/"><Button>Main Menu</Button></Link>
    </Card>
  );
}
