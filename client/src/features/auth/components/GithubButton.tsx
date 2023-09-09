import { FaGithub } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import cn from '@/utils/cn';

type Props = {
  to?: string;
  isAuthorized?: boolean;
};

// TODO move "to" to outside component and pass as prop
export default function GithubButton({ to, isAuthorized }: Props) {
  return (
    <a
      href={to ?? "http://localhost:5000/api/v1/auth/github/login"}
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
