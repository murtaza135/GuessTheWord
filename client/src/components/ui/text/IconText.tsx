import { ReactNode } from 'react';
import cn from '@/utils/cn';

type Props = {
  text: string;
  icon: ReactNode;
  className?: string;
};

export default function IconText({ text, icon, className }: Props) {
  return (
    <div className={cn('relative rounded-2xl bg-white', className)}>
      <span className={cn('absolute -left-4 -top-[0.35rem] text-3xl rounded-full p-1 bg-white', className)}>
        <i className='relative -left-[0.05rem]'>{icon}</i>
      </span>
      <p className={cn('ml-4 px-3 py-1 rounded-2xl nowrap max-w-[10rem] text-sm bg-white', className)}>{text}</p>
    </div>
  );
}
