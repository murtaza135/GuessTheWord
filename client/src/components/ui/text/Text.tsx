import cn from '@/utils/cn';

type Props = React.HTMLAttributes<HTMLParagraphElement>;

export default function Text({ children, className, ...rest }: Props) {
  return (
    <p
      className={cn('font-semibold md:text-lg text-center', className)}
      {...rest}
    >
      {children}
    </p>
  );
}
