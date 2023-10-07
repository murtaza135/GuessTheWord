import { RouteObject } from 'react-router-dom';
import HomePage from './page';

const mainMenuRoute: RouteObject = {
  path: "/",
  element: <HomePage />,
};

export default mainMenuRoute;