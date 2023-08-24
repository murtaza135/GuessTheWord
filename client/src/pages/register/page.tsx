import Card from '@/ui/cards/Card';
import Text from '@/ui/text/Text';
import RegisterForm from '@/features/auth/components/RegisterForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {

  return (
    <Card className='flex flex-col items-center gap-10 w-full max-w-sm'>
      <Text className='text-primary-900 text-3xl cursor-default'>Register</Text>
      <RegisterForm />
      <Link to="/login">
        <Text className='text-primary-900 hover:opacity-75 transition-opacity'>Already have an account? Login</Text>
      </Link>
    </Card>
  );
}
