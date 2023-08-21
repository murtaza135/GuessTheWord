import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema from './schema';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import Separator from '@/components/ui/Separator';

export default function LoginPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-10 items-center'>
        <Form
          schema={schema.login}
          onSubmit={(data) => { console.log(data); }}
          className='w-full max-w-xl flex flex-col gap-6'
        >
          <Input name='username' label='Username' type='text' />
          <Input name='password' label='Password' type='password' />
          <Button type='submit'>Submit</Button>
        </Form>

        <div className='flex flex-col gap-4'>
          <Link to="/register">
            <Text className='text-primary-900'>Don't have an account? Sign Up</Text>
          </Link>

          <Link to="/" className='w-full'>
            <Button className='w-full border-2 bg-transparent text-primary-900'>Play as Guest</Button>
          </Link>
        </div>

      </Card>
    </div>
  );
}
