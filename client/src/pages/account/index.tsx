import { RouteObject } from 'react-router-dom';
import AccountPage from './page';

const accountRoute: RouteObject = {
  path: "/account",
  element: <AccountPage />,
};

export default accountRoute;