import cn from '@/utils/cn';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  variant: keyof typeof variants;
};

const variants = {
  github: { className: 'text-6xl bg-white text-black', icon: <FaGithub /> },
  google: { className: 'text-4xl bg-white text-black border-gray-300', icon: <FcGoogle /> }
} as const;

export default function OAuthButton({ to, variant, ...rest }: Props) {
  return (
    <a
      href={to}
      className={cn('inline-flex justify-center items-center align-middle w-12 h-12 overflow-hidden aspect-square rounded-full cursor-pointer hover:opacity-75 transition-opacity border-[1px] border-transparent', variants[variant].className)}
      {...rest}
    >
      {variants[variant].icon}
    </a>
  );
}
