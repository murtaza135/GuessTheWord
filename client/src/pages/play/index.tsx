import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const PlayPage = lazy(() => import('./page'));

const playRoute: RouteObject = {
  path: "/play",
  element: <PlayPage />,
};

export default playRoute;