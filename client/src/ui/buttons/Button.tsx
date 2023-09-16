import React from 'react';
import cn from '@/utils/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $variant?: keyof typeof variants;
  $size?: keyof typeof sizes;
};

const variants = {
  primary: 'bg-primary-900 text-white hover:opacity-75 transition-opacity',
  greyedOut: 'border-2 border-gray-300 bg-transparent text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors'
} as const;

const sizes = {
  md: 'px-4 py-2',
  lg: 'text-3xl px-8 py-3'
} as const;

export default function Button({
  $variant = 'primary',
  $size = 'md',
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={cn('font-semibold px-4 py-2 rounded-md', variants[$variant], sizes[$size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
