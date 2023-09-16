import { Outlet } from "react-router-dom";
import queryClient from './api/queryClient';
import API from './api/api';
import { Toaster } from 'react-hot-toast';

queryClient.prefetchQuery({ queryKey: ['profile'], queryFn: () => API.get('/auth/profile') });
queryClient.prefetchQuery({ queryKey: ['winLoss'], queryFn: () => API.get('/winLoss') });

export default function App() {
  return (
    <>
      <Toaster position='bottom-center' />
      <Outlet />
    </>
  );
}