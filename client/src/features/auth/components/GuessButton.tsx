import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { BsCheck } from "react-icons/bs";
import { TiTimes } from "react-icons/ti";
import icon from "/images/icon.png";

type Props = {
  to: string;
  isAuthorized?: boolean;
};

export function GuessButton({ to, isAuthorized }: Props) {
  return (
    <Link
      to={to}
      className='relative inline-flex justify-center items-center align-middle w-12 h-12 aspect-square rounded-full cursor-pointer hover:opacity-75 transition-opacity border-[1px] border-gray-300'
      onClick={(event) => isAuthorized && event.preventDefault()}
    >
      <div className='overflow-hidden inline-flex justify-center items-center align-middle aspect-square rounded-full pt-1 w-12 h-12'>
        <img src={icon} alt="Button to register a guess account" />
      </div>
      {isAuthorized !== undefined && (
        <span className={cn("absolute text-white rounded-full -bottom-1 -right-1", isAuthorized ? 'bg-green-600' : 'bg-red-700')}>
          {isAuthorized ? <BsCheck /> : <TiTimes />}
        </span>
      )}
    </Link>
  );
}
