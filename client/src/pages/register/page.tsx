import Card from '@/ui/cards/Card';
import Text from '@/ui/text/Text';
import RegisterForm from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-8 w-full max-w-sm'>
        <Text className='text-primary-900 text-3xl cursor-default'>Register</Text>
        <RegisterForm />
      </Card>
    </div>
  );
}
