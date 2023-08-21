import { z } from 'zod';
import validator from 'validator';

const register = z.object({
  email: z.string().email({ message: 'Please provide a valid email' }),
  username: z.string({ required_error: 'Please provide a valid username' })
    .trim()
    .max(25, { message: 'Username cannot be longer than 25 characters' })
    .refine((username) => validator.isAlphanumeric(username)),
  name: z.string().trim(),
  password: z.string().trim().min(6, 'Password needs to be a minimum of 6 characters'),
  confirmPassword: z.string().trim(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
  .transform((data) => {
    const { confirmPassword, ...rest } = data;
    return rest;
  });

const schema = {
  register
};

export default schema;