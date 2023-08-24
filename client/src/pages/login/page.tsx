import Card from '@/ui/cards/Card';
import Button from '@/ui/buttons/Button';
import Text from '@/ui/text/Text';
import { Link } from 'react-router-dom';
import { LoginForm } from '@/features/auth';
import { GithubButton, GoogleButton } from '@/features/auth';

export default function LoginPage() {
  return (
    <Card className='flex flex-col gap-10 items-center w-full max-w-sm'>
      <Text className='text-primary-900 text-3xl cursor-default'>Login</Text>

      <LoginForm />

      <div className='flex flex-col justify-center items-center gap-3'>
        <p className='text-md text-primary-900 cursor-default'>Or login with</p>
        <div className="flex gap-4 justify-center">
          <GithubButton />
          <GoogleButton />
        </div>
      </div>

      <div className='flex flex-col items-center gap-4 w-full max-w-xl'>
        <Link to="/register">
          <Text className='text-primary-900 hover:opacity-75 transition-opacity'>Don't have an account? Sign Up</Text>
        </Link>

        <Link to="/">
          <Button color='greyedOut' className='w-auto'>Play as Guest</Button>
        </Link>
      </div>
    </Card>
  );
}
