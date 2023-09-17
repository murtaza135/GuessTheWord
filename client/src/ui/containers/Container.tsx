import cn from '@/utils/cn';

type Props = React.ComponentProps<"div"> & {
  $variant?: keyof typeof variants;
};

const variants = {
  normal: '',
  center: 'min-h-full flex justify-center items-center'
} as const;

export default function Container({ $variant = 'normal', children, className, ...rest }: Props) {

  return (
    <div
      className={cn('container mx-auto', variants[$variant], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
