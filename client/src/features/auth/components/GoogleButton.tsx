import { FcGoogle } from "react-icons/fc";
import { BsCheck } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import cn from '@/utils/cn';

type Props = {
  isAuthorized?: boolean;
};

export default function GithubButton({ isAuthorized }: Props) {
  return (
    <a
      href="http://localhost:5000/api/v1/auth/google/login"
      className='relative inline-flex justify-center items-center align-middle w-12 h-12 aspect-square rounded-full cursor-pointer hover:opacity-75 transition-opacity border-[1px] bg-white text-black border-gray-300'
      onClick={(event) => isAuthorized && event.preventDefault()}
    >
      <span className='overflow-hidden inline-flex justify-center items-center align-middle aspect-square rounded-full text-4xl w-12 h-12'>
        <FcGoogle />
      </span>
      {isAuthorized !== undefined && (
        <span className={cn("absolute text-white rounded-full -bottom-1 -right-1", isAuthorized ? 'bg-green-600' : 'bg-red-700')}>
          {isAuthorized ? <BsCheck /> : <TiTimes />}
        </span>
      )}
    </a>
  );
}
