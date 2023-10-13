import { z } from 'zod';
import validator from 'validator';

export const loginSchema = z.object({
  username: z.string({ required_error: 'Required' })
    .trim()
    .max(25, { message: 'Username cannot be longer than 25 characters' })
    .refine((username) => validator.isAlphanumeric(username), { message: 'Username can only contain letters and numbers' }),
  password: z.string().trim().min(6, 'Password too short'),
});

export const registerSchema = z.object({
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
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;