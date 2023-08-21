import { RouteObject } from 'react-router-dom';
import RegisterPage from './page';

const registerRoute: RouteObject = {
  path: "/register",
  element: <RegisterPage />,
};

export default registerRoute;