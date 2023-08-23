import { FaGithub } from "react-icons/fa";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className'>;

export default function GithubButton(props: Props) {
  return (
    <a
      href="http://localhost:5000/api/v1/auth/login/github"
      className='inline-flex justify-center items-center align-middle w-12 h-12 overflow-hidden aspect-square rounded-full cursor-pointer hover:opacity-75 transition-opacity border-[1px] border-transparent text-6xl bg-white text-black'
      {...props}
    >
      <FaGithub />
    </a>
  );
}
