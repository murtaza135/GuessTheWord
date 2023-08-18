import { z } from 'zod';

const login = z.object({
  username: z.string().trim().min(3, 'Invalid Credentials'),
  password: z.string().trim().min(6, 'Invalid Credentials'),
});

export type LoginProps = z.infer<typeof login>;

const authSchemas = {
  login
};

export default authSchemas;
