import { RouteObject } from 'react-router-dom';
import ErrorPage from './page';

const errorRoute: RouteObject = {
  path: "/error",
  element: <ErrorPage />,
};

export default errorRoute;