import { useSeparator, SeparatorProps } from 'react-aria';
import cn from '@/utils/cn';

type Props = SeparatorProps & {
  className?: string;
};

export default function Separator({ className, ...rest }: Props) {
  let { separatorProps } = useSeparator(rest);

  return (
    <div
      {...separatorProps}
      className={cn(rest.orientation === 'vertical' ? 'w-[2px] h-full' : 'h-[2px] w-full', 'bg-primary-900', className)}
    />
  );
}