import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import { z } from 'zod';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email' }),
  password: z.string().trim().min(6, 'Password needs to be a minimum of 6 characters'),
});

export default function LoginPage() {
  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Form schema={loginSchema} onSubmit={(data) => { console.log(data); }} className='w-full max-w-xl'>
        <Card className='my-4 flex flex-col gap-6'>
          <Input name='email' label='Email' type='email' />
          <Input name='password' label='Password' type='password' />
          <Button type='submit'>Submit</Button>
        </Card>
      </Form>
    </div>
  );
}
