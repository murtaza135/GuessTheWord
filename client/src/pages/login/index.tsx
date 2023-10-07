import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// import LoginPage from './page';
const LoginPage = lazy(() => import('./page'));

const loginRoute: RouteObject = {
  path: "/login",
  element: <LoginPage />,
};

export default loginRoute;