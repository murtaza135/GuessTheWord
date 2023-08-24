import Card from '@/ui/cards/Card';
import { RegisterForm } from '@/features/auth';
import { Link } from 'react-router-dom';

export default function RegisterPage() {

  return (
    <Card className='flex flex-col items-center gap-10 w-full max-w-sm'>
      <p className='font-semibold text-center text-primary-900 text-3xl cursor-default'>Register</p>
      <RegisterForm />
      <Link to="/login">
        <p className='md:text-lg font-semibold text-center text-primary-900 hover:opacity-75 transition-opacity'>Already have an account? Login</p>
      </Link>
    </Card>
  );
}
