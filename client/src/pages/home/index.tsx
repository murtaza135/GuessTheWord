import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('./page'));

const mainMenuRoute: RouteObject = {
  path: "/",
  element: <HomePage />,
};

export default mainMenuRoute;