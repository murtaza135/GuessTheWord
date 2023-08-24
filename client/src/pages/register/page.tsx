import Card from '@/ui/cards/Card';
import Text from '@/ui/text/Text';
import RegisterForm from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {

  return (
    <Card className='flex flex-col items-center gap-8 w-full max-w-sm'>
      <Text className='text-primary-900 text-3xl cursor-default'>Register</Text>
      <RegisterForm />
    </Card>
  );
}
