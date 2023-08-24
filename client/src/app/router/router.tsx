import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import pages from './pages';
import PrivateRouteLayout from '@/layouts/PrivateRouteLayout';
import PublicRouteLayout from '@/layouts/PublicRouteLayout';
import ErrorRouteLayout from '@/layouts/ErrorRouteLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

export default router;