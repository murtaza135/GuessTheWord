import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// import ProfilePage from './page';
const ProfilePage = lazy(() => import('./page'));

const profileRoute: RouteObject = {
  path: "/profile",
  element: <ProfilePage />,
};

export default profileRoute;