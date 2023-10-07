import { useProfile } from '@/features/auth';
import { Navigate } from 'react-router-dom';
import SpinnerContainer from '@/ui/spinners/SpinnerContainer';

export default function HomePage() {
  const { data, isLoading } = useProfile({ retry: 1 });

  if (isLoading) {
    return <SpinnerContainer />;
  }

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate to="/main-menu" replace />
  );
}
