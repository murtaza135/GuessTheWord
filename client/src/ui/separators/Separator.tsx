import { useSeparator, SeparatorProps } from 'react-aria';
import cn from '@/utils/cn';

type Props = SeparatorProps & {
  className?: string;
};

export default function Separator(props: Props) {
  const { separatorProps } = useSeparator(props);
  const { className, orientation } = props;

  return (
    <div
      {...separatorProps}
      className={cn(orientation === 'vertical' ? 'w-[2px] h-full' : 'h-[2px] w-full', 'bg-primary-900', className)}
    />
  );
}