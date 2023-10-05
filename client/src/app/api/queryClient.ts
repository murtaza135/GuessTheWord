import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: Infinity, // queries stored in idb, therefore should never expire
      networkMode: 'offlineFirst'
    },
    mutations: {
      networkMode: 'always'
    }
  }
});
