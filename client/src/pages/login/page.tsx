import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema, { LoginSchema } from './schema';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import useLogin from '@/components/auth/useLogin';
import GithubButton from '@/components/ui/buttons/GithubButton';
import GoogleButton from '@/components/ui/buttons/GoogleButton';
import { useMutation } from '@tanstack/react-query';
import API from '@/app/api/api';

export default function LoginPage() {
  const { mutate } = useLogin({ successRedirect: '/' });
  const handleSubmit = (data: LoginSchema) => mutate(data);

  const { mutate: mutate2 } = useMutation({
    mutationFn: () => API.get('/auth/login/github'),
    onSuccess: () => { console.log("success world"); },
    onError: () => { console.log("error world"); }
  });

  const githubSubmit = () => mutate2();

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
          <Button type='submit'>Login</Button>
          <a href="http://localhost:5000/api/v1/auth/login/github"><GithubButton type='button'>Sign in with Github</GithubButton></a>
          <a href="http://localhost:5000/api/v1/auth/login/google"><GoogleButton type='button'>Sign in with Google</GoogleButton></a>
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
