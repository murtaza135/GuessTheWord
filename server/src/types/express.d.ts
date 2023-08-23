import { UserData } from '../features/auth';

declare global {
  namespace Express {
    interface User extends UserData { }

    export interface Request {
      user?: User;
    }
  }
}

export { };
