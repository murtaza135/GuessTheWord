import { useSearchParams } from "react-router-dom";
import { Form } from '@/features/general/components/form/Form';
import { Input } from '@/features/general/components/form/Input';
import { Button } from '@/features/general/components/Button';
import { Spinner } from '@/features/general/components/spinners/Spinner';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginSchema, LoginSchema } from "@/features/auth/schema";
import { BsPerson } from "react-icons/bs";
import { BiLock } from "react-icons/bi";

export function LoginForm() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/';
  const { mutate, isLoading } = useLogin({ successRedirect: redirect });

  const handleSubmit = (data: LoginSchema) => {
    if (!isLoading) mutate(data);
  };

  return (
    <Form
      schema={loginSchema}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full max-w-xl'
    >
      <Input name='username' label='Username' placeholder='Username' type='text' icon={<BsPerson />} />
      <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
      <Button type='submit' className='mt-3'>{!isLoading ? 'Login' : <Spinner text='' imgSize={24} />}</Button>
    </Form>
  );
}
