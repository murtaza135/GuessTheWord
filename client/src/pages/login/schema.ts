import { z } from 'zod';
import validator from 'validator';

const login = z.object({
  username: z.string({ required_error: 'Required' })
    .trim()
    .max(25, { message: 'Username cannot be longer than 25 characters' })
    .refine((username) => validator.isAlphanumeric(username), { message: 'Username can only contain letters and numbers' }),
  password: z.string().trim().min(6, 'Password too short'),
});

const schema = {
  login
};

export default schema;