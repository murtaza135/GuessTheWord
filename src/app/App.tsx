import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className='h-full container mx-auto px-4'>
      <Outlet />
    </div>
  );
}
