import { useProfile } from '@/features/auth';
import Spinner from '@/ui/spinners/Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from '@/ui/containers/Container';
import { Navbar } from '@/features/navbar';
// import { toast } from 'react-hot-toast';
// import { useEffect } from 'react';

// TODO clean up
export default function PrivateRouteLayout() {
  // const { error, isLoading, isError, isFetching } = useProfile();
  // const { error, isLoading, isError, isFetching, isRefetching } = useProfile({ enabled: false });
  const { isError, isLoading, isSuccess } = useProfile({ enabled: true });
  // console.log(isLoading);
  // console.log(isError);
  // console.log(isSuccess);
  // console.log(isFetching);
  // console.log(isRefetching);

  // useEffect(() => {
  //   if (!isLoading && error) {
  //     toast.error(error?.message ?? 'Something went wrong', { id: 'private-route-layout' });
  //   }
  // }, [error, isLoading]);

  // if (isLoading) {
  //   return (
  //     <Container $variant='center' className='px-4 py-24'>
  //       <Spinner />
  //     </Container>
  //   );
  // }

  // if (isError) {
  //   // queryClient.removeQueries({ queryKey: ['profile'] });
  //   // queryClient.resetQueries({ queryKey: ['profile'] });
  //   // queryClient.fetchQuery({ queryKey: ['profile'] });
  //   // refetch();
  //   return <Navigate to="/login" replace />;
  // }

  // return (
  //   <>
  //     <Navbar />
  //     <Container $variant='center' className='px-4 pt-36 pb-24'>
  //       <Outlet />
  //     </Container>
  //   </>
  // );

  return (
    <>
      {isLoading && (
        <Container $variant='center' className='px-4 py-24'>
          <Spinner />
        </Container>
      )}

      {isError && <Navigate to="/login" replace />}

      {isSuccess && (
        <>
          <Navbar />
          <Container $variant='center' className='px-4 pt-36 pb-24'>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}
