import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema from './schema';
import useRegister from '@/components/auth/useRegister';
import { RegisterSchema } from './schema';

export default function RegisterPage() {
  const { mutate } = useRegister({ successRedirect: '/' });
  const handleSubmit = (data: RegisterSchema) => mutate(data);

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='w-full max-w-xl'>
        <Form
          schema={schema.register}
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full max-w-xl'
        >
          <Input name='email' label='Email' type='email' />
          <Input name='username' label='Username' type='text' />
          <Input name='name' label='Name' type='text' />
          <Input name='password' label='Password' type='password' />
          <Input name='confirmPassword' label='Confirm Password' type='password' />
          <Button type='submit'>Register</Button>
        </Form>
      </Card>
    </div>
  );
}
