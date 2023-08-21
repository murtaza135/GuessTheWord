import { RouteObject } from 'react-router-dom';
import MainMenuPage from './page';

const mainMenuRoute: RouteObject = {
  path: "/",
  element: <MainMenuPage />,
};

export default mainMenuRoute;