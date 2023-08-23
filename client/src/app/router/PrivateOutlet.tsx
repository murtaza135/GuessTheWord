import useProfile from '../../features/auth/hooks/useProfile';
import Spinner from '../../components/ui/spinner/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateOutlet() {
  const location = useLocation();
  const { data, isLoading } = useProfile();

  if (isLoading) return <Spinner />;
  if (!data) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}
