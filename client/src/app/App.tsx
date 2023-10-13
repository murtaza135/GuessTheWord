import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/app/api/queryClient';
import { persistOptions } from '@/app/api/persister';
import { router } from '@/app/router/router';
import { SpinnerContainer } from '@/features/general/components/spinners/SpinnerContainer';

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
