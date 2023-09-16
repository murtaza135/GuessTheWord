import { Outlet } from "react-router-dom";
import useToastErrorFromQueryParams from '@/hooks/useToastErrorFromQueryParams';

export default function RootLayout() {
  useToastErrorFromQueryParams();
  return <Outlet />;
}
