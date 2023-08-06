import { RouteObject } from 'react-router-dom';
import PlayPage from './page';

const playRoute: RouteObject = {
  path: "/play",
  element: <PlayPage />,
};

export default playRoute;