import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { useToastErrorFromQueryParams } from '@/features/general/hooks/useToastErrorFromQueryParams';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { useAccounts } from '@/features/auth/hooks/useAccounts';
import { useWinLoss } from '@/features/win-loss/hooks/useWinLoss';

export function RootLayout() {
  // queryClient.prefetchQuery does not wait for react query to load its data
  // that was persisted onto idb, and therefore causes a race condition that returns
  // incorrect data, however useQuery does wait for react query to load its data,
  // therefore until a better solution can be found, query data must be "prefetched"
  // as below
  useProfile({ refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });
  useAccounts({ refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });
  useWinLoss({ refetchOnMount: false, refetchOnReconnect: false, refetchOnWindowFocus: false });

  useToastErrorFromQueryParams();

  return (
    <>
      <Outlet />
      <Offline>
        <div className='fixed bottom-0 w-full py-1 bg-red-700 text-white text-center text-sm'>
          No Internet Connection
        </div>
      </Offline>
    </>
  );
}
