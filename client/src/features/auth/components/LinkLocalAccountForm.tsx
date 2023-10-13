import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '@/features/general/components/form/Form';
import { Input } from '@/features/general/components/form/Input';
import { Button } from '@/features/general/components/Button';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { useLinkLocalAccount } from '@/features/auth/hooks/useLinkLocalAccount';
import { useAccounts } from '../hooks/useAccounts';
import { registerSchema, RegisterSchema } from "@/features/auth/schema";
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { SpinnerContainer } from '@/features/general/components/spinners/SpinnerContainer';

export function LinkLocalAccountForm() {
  const navigate = useNavigate();
  const { mutate } = useLinkLocalAccount({ successRedirect: '/profile' });
  const { data: profile } = useProfile();
  const { data: accounts, isLoading } = useAccounts();
  const hasLocalAccount = !!accounts?.localAccount;

  // TODO fix flash or remove
  useEffect(() => {
    if (hasLocalAccount) navigate('/profile');
  }, [hasLocalAccount, navigate]);

  const handleSubmit = (data: RegisterSchema) => mutate(data);

  if (isLoading) {
    return <SpinnerContainer />;
  }

  return (
    <Form
      schema={registerSchema}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full max-w-xl'
    >
      <Input name='email' label='Email' placeholder='Email' type='email' icon={<AiOutlineMail />} defaultValue={profile?.email ?? ''} />
      <Input name='username' label='Username' placeholder='Useranme' type='text' icon={<BsPerson />} />
      <Input name='name' label='Name' placeholder='Name' type='text' icon={<BsPersonCircle />} defaultValue={profile?.name ?? ''} />
      <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
      <Input name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' icon={<BiLock />} />
      <Button type='submit' className='mt-3'>Link Account</Button>
    </Form>
  );
}
