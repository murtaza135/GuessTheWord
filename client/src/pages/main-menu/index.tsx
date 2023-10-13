import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const MainMenuPage = lazy(() => import('./page'));

const mainMenuRoute: RouteObject = {
  path: "/main-menu",
  element: <MainMenuPage />,
};

export default mainMenuRoute;