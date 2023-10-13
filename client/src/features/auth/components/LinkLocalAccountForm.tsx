import { Form, Input } from '@/ui/form';
import Button from '@/ui/buttons/Button';
import { AiOutlineMail } from "react-icons/ai";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import useLinkLocalAccount from '../hooks/useLinkLocalAccount';
import * as authSchema from '../schema';
import { type RegisterSchema } from "../schema";
import useProfile from '../hooks/useProfile';

export default function LinkLocalAccountForm() {
  const { mutate } = useLinkLocalAccount({ successRedirect: '/profile' });
  const { data } = useProfile();
  const handleSubmit = (data: RegisterSchema) => mutate(data);

  // TODO redirect to profile page on error (specifically when local account already exists)
  // TODO OR make it so that the page simply cannot be accessed if a local account exists
  return (
    <Form
      schema={authSchema.register}
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 w-full max-w-xl'
    >
      <Input name='email' label='Email' placeholder='Email' type='email' icon={<AiOutlineMail />} defaultValue={data?.email ?? ''} />
      <Input name='username' label='Username' placeholder='Useranme' type='text' icon={<BsPerson />} />
      <Input name='name' label='Name' placeholder='Name' type='text' icon={<BsPersonCircle />} defaultValue={data?.name ?? ''} />
      <Input name='password' label='Password' placeholder='Password' type='password' icon={<BiLock />} />
      <Input name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' icon={<BiLock />} />
      <Button type='submit' className='mt-3'>Link Account</Button>
    </Form>
  );
}
