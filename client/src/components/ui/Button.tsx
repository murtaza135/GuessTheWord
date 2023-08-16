import React from 'react';
import cn from '@/utils/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={cn('bg-primary-900 text-white font-semibold px-4 py-2 rounded-md hover:opacity-75 transition-opacity', className)}
      {...rest}
    >
      {children}
    </button>
  );
}
