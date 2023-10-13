import { useEffect } from 'react';
import config from '@/config/config';

type Props = {
  title: string;
  hideAppName?: boolean;
};

export default function Title({ title, hideAppName }: Props) {
  useEffect(() => {
    const previousTitle = document.title;
    const newTitle = hideAppName ? title : `${title} - ${config.APP_NAME}`;
    document.title = newTitle;

    return () => { document.title = previousTitle; };
  }, [title]);

  return <></>;
}
