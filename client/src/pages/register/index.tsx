import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// import RegisterPage from './page';
const RegisterPage = lazy(() => import('./page'));

const registerRoute: RouteObject = {
  path: "/register",
  element: <RegisterPage />,
};

export default registerRoute;