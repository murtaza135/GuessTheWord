import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import Text from '@/components/ui/text/Text';
import { Link } from 'react-router-dom';
import OAuthButton from '@/components/ui/buttons/OAuthButton';
import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-10 items-center w-full max-w-sm'>
        <Text className='text-primary-900 text-3xl cursor-default'>Login</Text>

        <LoginForm />

        <div className='flex flex-col justify-center items-center gap-3'>
          <p className='text-md text-primary-900 cursor-default'>Or login with</p>
          <div className="flex gap-4 justify-center">
            <OAuthButton variant='github' to='http://localhost:5000/api/v1/auth/login/github' />
            <OAuthButton variant='google' to='http://localhost:5000/api/v1/auth/login/google' />
          </div>
        </div>

        <div className='flex flex-col items-center gap-4 w-full max-w-xl'>
          <Link to="/register">
            <Text className='text-primary-900 hover:opacity-75 transition-opacity'>Don't have an account? Sign Up</Text>
          </Link>

          <Link to="/">
            <Button className='border-2 border-gray-300 bg-transparent text-gray-400 w-auto'>Play as Guest</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
