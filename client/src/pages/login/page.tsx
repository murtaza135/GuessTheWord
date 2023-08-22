import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema, { LoginSchema } from './schema';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import useLogin from '@/components/auth/useLogin';

export default function LoginPage() {
  const { mutate } = useLogin({ successRedirect: '/' });
  const handleSubmit = (data: LoginSchema) => mutate(data);

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-10 items-center w-full max-w-xl'>
        <Form
          schema={schema.login}
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full max-w-xl'
        >
          <Input name='username' label='Username' type='text' />
          <Input name='password' label='Password' type='password' />
          <Button type='submit'>Submit</Button>
        </Form>

        <div className='flex flex-col gap-4 w-full max-w-xl'>
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
