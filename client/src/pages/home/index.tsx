import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// import HomePage from './page';
const HomePage = lazy(() => import('./page'));

const mainMenuRoute: RouteObject = {
  path: "/",
  element: <HomePage />,
};

export default mainMenuRoute;