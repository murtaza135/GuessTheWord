import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "@/app/App";
import ErrorPage from '@/pages/error/page';
import pages from './pages';
import PrivateOutlet from '@/app/router/PrivateOutlet';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Outlet />,
        children: pages.public
      },
      {
        element: <PrivateOutlet />,
        children: pages.private
      },
    ]
  }
]);

export default router;