import { FaGithub } from "react-icons/fa";
import cn from '@/utils/cn';

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
};

export default function GithubButton({ to, className, children, ...rest }: Props) {
  return (
    <a
      href={to}
      className={cn('flex justify-center items-center gap-3 bg-black text-white font-semibold px-4 py-2 rounded-md hover:opacity-75 transition-opacity', className)}
      {...rest}
    >
      <i className='text-2xl'><FaGithub /></i>
      {children}
    </a>
  );
}
