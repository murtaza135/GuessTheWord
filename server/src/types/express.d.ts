import { User as AuthUser } from '../features/auth/auth.types';

declare global {
  namespace Express {
    interface User extends AuthUser { }

    export interface Request {
      user?: User;
    }
  }
}

export { };
