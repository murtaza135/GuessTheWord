import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// import ConnectLocalAccountPage from './page';
const ConnectLocalAccountPage = lazy(() => import('./page'));

const registerRoute: RouteObject = {
  path: "/connections/guess",
  element: <ConnectLocalAccountPage />,
};

export default registerRoute;