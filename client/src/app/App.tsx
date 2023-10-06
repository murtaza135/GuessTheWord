import { queryClient } from './api/queryClient';
import { persistOptions } from './api/persister';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './router/router';
import Prefetch from './api/Prefetch';

export default function App() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <Prefetch />
      <RouterProvider router={router} />
      <Toaster position='bottom-center' />
      <ReactQueryDevtools initialIsOpen={false} panelPosition='bottom' position='bottom-right' />
    </PersistQueryClientProvider>
  );
}
