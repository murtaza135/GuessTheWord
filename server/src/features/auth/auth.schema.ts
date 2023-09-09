import { z } from 'zod';
import validator from 'validator';

export const userId = z.object({
  userId: z.number().positive()
});

export const create = z.object({
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

export const login = z.object({
  username: z.string()
    .trim()
    .max(25, { message: 'Invalid Credentials' })
    .refine((username) => validator.isAlphanumeric(username), { message: 'Invalid Credentials' }),
  password: z.string().trim().min(6, 'Invalid Credentials'),
});

export type UserIdSchema = z.infer<typeof userId>;
export type CreateSchema = z.infer<typeof create>;
export type LoginSchema = z.infer<typeof login>;
