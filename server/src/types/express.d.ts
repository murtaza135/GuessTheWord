import { ExpressRequestUser } from '../features/auth/auth.types';

declare global {
  namespace Express {
    interface User extends ExpressRequestUser { }

    export interface Request {
      user?: User;
    }
  }
}

export { };
