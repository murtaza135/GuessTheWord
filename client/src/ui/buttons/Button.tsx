import React from 'react';
import cn from '@/utils/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
};

const colors = {
  primary: 'bg-primary-900 text-white hover:opacity-75 transition-opacity',
  greyedOut: 'border-2 border-gray-300 bg-transparent text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors'
} as const;

const sizes = {
  md: 'px-4 py-2',
  lg: 'text-3xl px-8 py-3'
};

export default function Button({ color, size, children, className, ...rest }: Props) {
  const colorValue = color ?? 'primary';
  const sizeValue = size ?? 'md';

  return (
    <button
      className={cn('font-semibold px-4 py-2 rounded-md', colors[colorValue], sizes[sizeValue], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
