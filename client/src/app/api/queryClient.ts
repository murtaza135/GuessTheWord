import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: Infinity,
      networkMode: 'offlineFirst'
    },
    mutations: {
      networkMode: 'always'
    }
  }
});
