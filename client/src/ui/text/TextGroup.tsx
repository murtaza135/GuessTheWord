import React, { ReactNode } from 'react';
import cn from '@/utils/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
  icon?: ReactNode;
};

export default function TextGroup({ label, icon, children, className }: Props) {
  return (
    <div className={cn('flex gap-5 w-full', className)}>
      {icon && <i className='flex justify-center items-center text-xl border-2 rounded-full p-3 border-gray-200 text-primary-900'>{icon}</i>}
      <div className='flex flex-col justify-center gap-0.5 text-primary-900 break-all'>
        {label && <label className='text-gray-400 text-xs'>{label}</label>}
        <p className='font-semibold cursor-default'>
          {children}
        </p>
      </div>
    </div>
  );
}
