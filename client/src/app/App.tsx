import { Outlet } from "react-router-dom";
import queryClient from './api/queryClient';
import { getLosses, getWins } from './api/old-api';
import API from './api/api';
import { Toaster } from 'react-hot-toast';

queryClient.prefetchQuery({ queryKey: ['wins'], queryFn: getWins });
queryClient.prefetchQuery({ queryKey: ['losses'], queryFn: getLosses });
queryClient.prefetchQuery({ queryKey: ['profile'], queryFn: () => API.get('/auth/profile') });

export default function App() {
  return (
    <>
      <Toaster position='bottom-center' />
      <Outlet />
    </>
  );
}
