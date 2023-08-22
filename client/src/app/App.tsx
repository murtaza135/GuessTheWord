import { Outlet } from "react-router-dom";
import queryClient from './api/queryClient';
import { getLosses, getWins } from './api/api';
import API from './api/api2';

queryClient.prefetchQuery({ queryKey: ['wins'], queryFn: getWins });
queryClient.prefetchQuery({ queryKey: ['losses'], queryFn: getLosses });
queryClient.prefetchQuery({ queryKey: ['profile'], queryFn: () => API.get('/auth/me') });

export default function App() {
  return (
    <div className='h-full container mx-auto px-4'>
      <Outlet />
    </div>
  );
}
