import { ReactNode } from 'react';
import cn from '@/utils/cn';

type Props = {
  value: string | number;
  icon: ReactNode;
  color?: keyof typeof colors;
  className?: string;
};

const colors = {
  primary: 'bg-primary-900 text-white',
  red: 'bg-red-600 text-white',
  green: 'bg-green-400 text-black'
} as const;

export default function Stat({ value, icon, color = 'primary', className }: Props) {
  return (
    <div className={cn('relative rounded-2xl', colors[color], className)}>
      <span className={cn('absolute -left-4 -top-[0.35rem] text-3xl rounded-full p-1', colors[color])}>
        <i className='relative -left-[0.05rem]'>{icon}</i>
      </span>
      <p className={cn('ml-4 px-3 py-1 rounded-2xl nowrap max-w-[10rem] text-sm', colors[color])}>{value}</p>
    </div>
  );
}
