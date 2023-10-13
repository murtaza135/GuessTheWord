import { createBrowserRouter } from "react-router-dom";
import { pages } from './pages';
import { RootLayout } from '@/app/layouts/RootLayout';
import { PrivateRouteLayout } from '@/app/layouts/PrivateRouteLayout';
import { PublicRouteLayout } from '@/app/layouts/PublicRouteLayout';
import { ErrorRouteLayout } from '@/app/layouts/ErrorRouteLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorRouteLayout />,
    children: [
      {
        element: <PublicRouteLayout />,
        children: pages.public
      },
      {
        element: <PrivateRouteLayout />,
        children: pages.private
      },
    ]
  }
]);
