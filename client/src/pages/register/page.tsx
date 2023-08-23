import Form from '@/components/ui/form/Form';
import Input from '@/components/ui/form/Input';
import Card from '@/components/ui/cards/Card';
import Button from '@/components/ui/buttons/Button';
import schema from './schema';
import useRegister from '@/components/auth/useRegister';
import { RegisterSchema } from './schema';
import Text from '@/components/ui/text/Text';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { BiLock } from "react-icons/bi";

export default function RegisterPage() {
  const { mutate } = useRegister({ successRedirect: '/' });
  const handleSubmit = (data: RegisterSchema) => mutate(data);

  return (
    <div className='h-full flex flex-col py-10 items-center justify-center mx-4'>
      <Card className='flex flex-col gap-8 w-full max-w-sm'>
        <Text className='text-primary-900 text-3xl cursor-default'>Register</Text>

        <Form
          schema={schema.register}
          onSubmit={handleSubmit}
          className='flex flex-col gap-6 w-full max-w-xl'
        >
          <Input name='email' label='Email' placeholder='Email' type='email' icon={<AiOutlineMail />} />
          <Input name='username' label='Username' placeholder='Useranme' type='text' icon={<BsPerson />} />
          <Input name='name' label='Name' placeholder='Name' type='text' icon={<BsPersonCircle />} />
          <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
          <Input name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' icon={<BiLock />} />
          <Button type='submit' className='mt-3'>Register</Button>
        </Form>
      </Card>
    </div>
  );
}
