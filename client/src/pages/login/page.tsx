import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema, { LoginSchema } from './schema';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import useLogin from '@/components/auth/useLogin';
import OAuthButton from '@/components/ui/buttons/OAuthButton';

export default function LoginPage() {
  const { mutate } = useLogin({ successRedirect: '/' });
  const handleSubmit = (data: LoginSchema) => mutate(data);

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-10 items-center w-full max-w-sm'>
        <Text className='text-primary-900 text-3xl'>Login</Text>

        <Form
          schema={schema.login}
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full max-w-xl'
        >
          <Input name='username' label='Username' type='text' />
          <Input name='password' label='Password' type='password' />
          <Button type='submit'>Login</Button>

        </Form>

        <div className='flex flex-col justify-center items-center gap-3'>
          <p className='text-md text-primary-900 cursor-default'>Or login with</p>
          <div className="flex gap-3 justify-center">
            <OAuthButton variant='github' to='http://localhost:5000/api/v1/auth/login/github' />
            <OAuthButton variant='google' to='http://localhost:5000/api/v1/auth/login/google' />
          </div>
        </div>

        <div className='flex flex-col items-center gap-4 w-full max-w-xl'>
          <Link to="/register">
            <Text className='text-primary-900'>Don't have an account? Sign Up</Text>
          </Link>

          <Link to="/">
            <Button className='border-2 border-gray-300 bg-transparent text-gray-400 w-auto'>Play as Guest</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
