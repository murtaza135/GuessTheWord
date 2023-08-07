import { Outlet } from "react-router-dom";
import queryClient from './api/queryClient';
import { getLosses, getWins } from './api/api';

queryClient.prefetchQuery({ queryKey: ['wins'], queryFn: getWins });
queryClient.prefetchQuery({ queryKey: ['losses'], queryFn: getLosses });

export default function App() {
  return (
    <div className='h-full container mx-auto px-4'>
      <Outlet />
    </div>
  );
}
