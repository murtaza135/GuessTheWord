import { RouteObject } from 'react-router-dom';
import ProfilePage from './page';

const profileRoute: RouteObject = {
  path: "/profile",
  element: <ProfilePage />,
};

export default profileRoute;