import { useProfile, useAccounts } from '@/features/auth';
import { useWinLoss } from '@/features/win-loss';

// queryClient.prefetchQuery does not wait for react query to load its data
// that was persisted onto idb, and therefore causes a race condition that returns
// incorrect data, however useQuery does wait for react query to load its data,
// therefore until a better solution can be found, query data must be prefetched
// as below
export default function Prefetch() {
  useProfile();
  useAccounts();
  useWinLoss();
  return <></>;
}
