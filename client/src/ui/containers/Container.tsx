import cn from '@/utils/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variants;
};

const variants = {
  normal: '',
  center: 'min-h-full flex justify-center items-center'
} as const;

export default function Container({ variant, children, className, ...rest }: Props) {
  const variantValue = variant ?? 'normal';

  return (
    <div
      className={cn('container mx-auto', variants[variantValue], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
