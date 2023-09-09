import { ExpressUser } from '../features/auth';

declare global {
  namespace Express {
    interface User extends ExpressUser { }

    export interface Request {
      user?: User;
    }
  }
}

export { };
