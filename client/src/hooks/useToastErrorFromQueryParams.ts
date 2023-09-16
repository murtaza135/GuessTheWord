import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function useToastErrorFromQueryParams() {
  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');

  useEffect(() => {
    // for some weird reason the toast only wants to work in a setTimeout
    // and I have no idea why
    const timer = (() => {
      if (errorParam) {
        return setTimeout(() => {
          toast.error(errorParam, { id: 'error-query-param' });
        }, 0);
      }
    })();

    return () => clearTimeout(timer);
  }, [errorParam]);
}
