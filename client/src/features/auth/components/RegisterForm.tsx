import { Form, Input } from '@/ui/form';
import Button from '@/ui/buttons/Button';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import useRegister from '../hooks/useRegister';
import * as authSchema from '../schema';
import { type RegisterSchema } from "../schema";
import { useSearchParams } from "react-router-dom";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { mutate } = useRegister({ successRedirect: redirect });
  const handleSubmit = (data: RegisterSchema) => mutate(data);

  return (
    <Form
      schema={authSchema.register}
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
  );
}
