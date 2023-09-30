import { queryClient } from './api/queryClient';
import { persistOptions } from './api/persister';
import api from './api/api';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './router/router';

queryClient.prefetchQuery({ queryKey: ['profile'], queryFn: () => api.get('auth/profile').json() });
queryClient.prefetchQuery({ queryKey: ['winLoss'], queryFn: () => api.get('winLoss').json() });

export default function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} panelPosition='bottom' position='bottom-right' />
      <Toaster position='bottom-center' />
    </PersistQueryClientProvider>
  );
}
