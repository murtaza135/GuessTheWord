import * as RadixUIAvatar from '@radix-ui/react-avatar';
import cn from '@/utils/cn';
import { BsFillPersonFill } from "react-icons/bs";

type Props = {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
};

export default function Avatar({ src, alt, fallback, className }: Props) {
  return (
    <RadixUIAvatar.Root className={cn("inline-flex justify-center items-center align-middle overflow-hidden select-none w-10 h-10 aspect-square rounded-full bg-white", className)}>
      <RadixUIAvatar.Image
        className="w-full h-full object-cover rounded-full"
        src={src}
        alt={alt}
      />
      <RadixUIAvatar.Fallback
        className={cn("relative w-full h-full flex justify-center items-center bg-white font-semibold", className)}
        delayMs={600}
      >
        {fallback
          ? <p className={cn('text-primary-900', className)}>{fallback?.substring(0, 2)}</p>
          : (
            <i className={cn('absolute w-full h-full text-5xl -left-1 top-0.5 text-gray-400', className)}>
              <BsFillPersonFill />
            </i>
          )
        }
      </RadixUIAvatar.Fallback>
    </RadixUIAvatar.Root>
  );
}
