import { queryClient } from './api/queryClient';
import { persistOptions } from './api/persister';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './router/router';
import { Suspense } from 'react';
import SpinnerContainer from '@/ui/spinners/SpinnerContainer';

export default function App() {
  return (
    <Suspense fallback={<SpinnerContainer />}>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        <RouterProvider router={router} />
        <Toaster position='bottom-center' />
        <ReactQueryDevtools initialIsOpen={false} panelPosition='bottom' position='bottom-right' />
      </PersistQueryClientProvider>
    </Suspense>
  );
}
