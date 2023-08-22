import { Outlet } from "react-router-dom";
import queryClient from './api/queryClient';
import { getLosses, getWins } from './api/old-api';
import API from './api/api';
import Navbar from '@/components/ui/navbar/Navbar';

queryClient.prefetchQuery({ queryKey: ['wins'], queryFn: getWins });
queryClient.prefetchQuery({ queryKey: ['losses'], queryFn: getLosses });
queryClient.prefetchQuery({ queryKey: ['profile'], queryFn: () => API.get('/auth/me') });

export default function App() {
  return (
    <div className='h-full container mx-auto'>
      <Navbar />
      <div className='h-full flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}
