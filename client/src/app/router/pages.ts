import { RouteObject } from 'react-router-dom';
import loginRoute from '@/pages/login';
import registerRoute from '@/pages/register';
import accountRoute from '@/pages/account';
import mainMenuRoute from '@/pages/main-menu';
import playRoute from '@/pages/play';

const pages: RouteObject[] = [
  loginRoute,
  registerRoute,
  accountRoute,
  mainMenuRoute,
  playRoute
];

export default pages;