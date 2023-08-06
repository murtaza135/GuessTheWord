import cn from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: Props) {
  return (
    <section className={cn('bg-gray-50 text-black rounded-md px-8 py-6', className)}>
      {children}
    </section>
  );
}
