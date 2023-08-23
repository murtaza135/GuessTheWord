import { FcGoogle } from "react-icons/fc";
import cn from '@/utils/cn';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
};

export default function GoogleButton({ to, className, children, ...rest }: Props) {
  return (
    <a
      href={to}
      className={cn('flex justify-center items-center gap-3 bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition-colors border-[1px] border-gray-300', className)}
      {...rest}
    >
      <i className='text-2xl'><FcGoogle /></i>
      {children}
    </a>
  );
}
