import { ExpressRequestUser } from '../features/auth';

declare global {
  namespace Express {
    interface User extends ExpressRequestUser { }

    export interface Request {
      user?: User;
    }
  }
}

export { };
