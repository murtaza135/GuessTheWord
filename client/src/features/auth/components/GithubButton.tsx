import { cn } from '@/utils/cn';
import { FaGithub } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";

type Props = {
  to: string;
  isAuthorized?: boolean;
};

export function GithubButton({ to, isAuthorized }: Props) {
  return (
    <a
      href={to}
      className='relative  aspect-square rounded-full w-12 h-12 cursor-pointer hover:opacity-75 transition-opacity border-[1px] border-transparent bg-white text-black'
      onClick={(event) => isAuthorized && event.preventDefault()}
    >
      <span className='overflow-hidden inline-flex justify-center items-center align-middle aspect-square rounded-full text-6xl w-12 h-12'>
        <FaGithub />
      </span>
      {isAuthorized !== undefined && (
        <span className={cn("absolute text-white rounded-full -bottom-1 -right-1", isAuthorized ? 'bg-green-600' : 'bg-red-700')}>
          {isAuthorized ? <BsCheck /> : <TiTimes />}
        </span>
      )}
    </a>
  );
}
