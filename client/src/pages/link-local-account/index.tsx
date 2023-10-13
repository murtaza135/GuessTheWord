import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LinkLocalAccountPage = lazy(() => import('./page'));

const registerRoute: RouteObject = {
  path: "/accounts/link/guess",
  element: <LinkLocalAccountPage />,
};

export default registerRoute;