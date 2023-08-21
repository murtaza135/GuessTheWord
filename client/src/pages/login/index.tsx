import { RouteObject } from 'react-router-dom';
import LoginPage from './page';

const loginRoute: RouteObject = {
  path: "/login",
  element: <LoginPage />,
};

export default loginRoute;