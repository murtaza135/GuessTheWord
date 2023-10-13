import { useEffect } from 'react';
import { Outlet, useSearchParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Offline } from "react-detect-offline";
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

  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');

  // if error query param exists, show error in toast
  useEffect(() => {
    // for some weird reason the toast only wants to work in a setTimeout
    // and I have no idea why
    const timer = (() => {
      if (errorParam) {
        return setTimeout(() => {
          toast.error(errorParam, { id: 'error-query-param' });
        }, 0);
      }
    })();

    return () => clearTimeout(timer);
  }, [errorParam]);

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
