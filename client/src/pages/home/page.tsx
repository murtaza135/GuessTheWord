import { Navigate } from 'react-router-dom';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { SpinnerContainer } from '@/features/general/components/spinners/SpinnerContainer';

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
