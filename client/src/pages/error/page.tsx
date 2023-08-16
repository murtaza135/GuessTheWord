import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center'>
      <Card className='flex flex-col gap-10 items-center'>
        <div className='flex flex-col gap-3'>
          <Text className='text-primary-900 font-bold  text-5xl md:text-5xl'>404</Text>
          <Text className='text-primary-900 font-bold  text-2xl md:text-2xl'>Page Not Found</Text>
        </div>
        <Link to="/"><Button>Main Menu</Button></Link>
      </Card>
    </div>
  );
}