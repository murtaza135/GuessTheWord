import { FaGithub } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import cn from '@/utils/cn';

type Props = {
  isAuthorized?: boolean;
};


export default function GithubButton({ isAuthorized }: Props) {
  return (
    <a
      href="http://localhost:5000/api/v1/auth/login/github"
      className='relative  aspect-square rounded-full w-12 h-12 cursor-pointer hover:opacity-75 transition-opacity border-[1px] border-transparent bg-white text-black'
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
