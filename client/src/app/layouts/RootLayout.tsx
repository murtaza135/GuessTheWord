import { Outlet } from "react-router-dom";
import useToastErrorFromQueryParams from '@/hooks/useToastErrorFromQueryParams';
import { useProfile, useAccounts } from '@/features/auth';
import { useWinLoss } from '@/features/win-loss';

export default function RootLayout() {
  // queryClient.prefetchQuery does not wait for react query to load its data
  // that was persisted onto idb, and therefore causes a race condition that returns
  // incorrect data, however useQuery does wait for react query to load its data,
  // therefore until a better solution can be found, query data must be prefetched
  // as below
  useProfile();
  useAccounts();
  useWinLoss();

  useToastErrorFromQueryParams();

  return <Outlet />;
}
