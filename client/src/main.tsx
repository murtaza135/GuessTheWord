import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import router from '@/app/router/router';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/app/api/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/register';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} panelPosition='bottom' position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>,
);
