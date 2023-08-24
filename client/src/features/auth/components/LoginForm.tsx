import { Form, Input } from '@/ui/form';
import Button from '@/ui/buttons/Button';
import { BsPerson } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import useLogin from '../hooks/useLogin';
import * as authSchema from '../schema';
import { type LoginSchema } from "../schema";

export default function LoginForm() {
  const { mutate } = useLogin({ successRedirect: '/' });
  const handleSubmit = (data: LoginSchema) => mutate(data);

  return (
    <Form
      schema={authSchema.login}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full max-w-xl'
    >
      <Input name='username' label='Username' placeholder='Username' type='text' icon={<BsPerson />} />
      <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
      <Button type='submit' className='mt-3'>Login</Button>
    </Form>
  );
}
