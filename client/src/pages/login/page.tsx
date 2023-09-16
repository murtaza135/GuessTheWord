import Card from '@/ui/cards/Card';
import Button from '@/ui/buttons/Button';
import { Link } from 'react-router-dom';
import { LoginForm, GithubButton, GoogleButton } from '@/features/auth';

export default function LoginPage() {
  return (
    <Card className='flex flex-col gap-10 items-center w-full max-w-sm'>
      <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Login</p>

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
          <p className='md:text-lg font-semibold text-center text-primary-900 hover:opacity-75 transition-opacity'>Don't have an account? Sign Up</p>
        </Link>

        <Link to="/">
          <Button $variant='greyedOut'>Play as Guest</Button>
        </Link>
      </div>
    </Card>
  );
}
