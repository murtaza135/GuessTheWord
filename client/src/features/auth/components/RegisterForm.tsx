import { useSearchParams } from "react-router-dom";
import { Form } from '@/features/general/components/form/Form';
import { Input } from '@/features/general/components/form/Input';
import { Button } from '@/features/general/components/Button';
import { Spinner } from '@/features/general/components/spinners/Spinner';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { registerSchema, RegisterSchema } from "@/features/auth/schema";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { BiLock } from "react-icons/bi";

export function RegisterForm() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { mutate, isLoading } = useRegister({ successRedirect: redirect });

  const handleSubmit = (data: RegisterSchema) => {
    if (!isLoading) mutate(data);
  };

  return (
    <Form
      schema={registerSchema}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full max-w-xl'
    >
      <Input name='email' label='Email' placeholder='Email' type='email' icon={<AiOutlineMail />} />
      <Input name='username' label='Username' placeholder='Username' type='text' icon={<BsPerson />} />
      <Input name='name' label='Name' placeholder='Name' type='text' icon={<BsPersonCircle />} />
      <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
      <Input name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' icon={<BiLock />} />
      <Button type='submit' className='mt-3'>{!isLoading ? 'Register' : <Spinner text='' imgSize={24} />}</Button>
    </Form>
  );
}
