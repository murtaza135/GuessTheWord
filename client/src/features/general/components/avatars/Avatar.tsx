import * as RadixUIAvatar from '@radix-ui/react-avatar';
import { cn } from '@/utils/cn';
import { BsFillPersonFill } from "react-icons/bs";
import upperFirst from "lodash/upperFirst";

type Props = {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
};

export function Avatar({ src, alt, fallback, className }: Props) {
  return (
    <RadixUIAvatar.Root className="inline-flex justify-center items-center align-middle overflow-hidden select-none w-10 h-10 aspect-square rounded-full hover:opacity-75 transition-opacity">
      <RadixUIAvatar.Image
        className="w-full h-full object-cover rounded-full"
        src={src}
        alt={alt}
      />
      <RadixUIAvatar.Fallback
        className={cn("relative w-full h-full flex justify-center items-center bg-white text-primary-900 font-semibold", className)}
        delayMs={600}
      >
        {fallback
          ? (
            <p className={cn('text-primary-900', className)}>
              {upperFirst(fallback.substring(0, 2))}
            </p>
          )
          : (
            <span className='absolute w-full h-full text-5xl -left-1 top-0.5 text-gray-400'>
              <BsFillPersonFill />
            </span>
          )
        }
      </RadixUIAvatar.Fallback>
    </RadixUIAvatar.Root>
  );
}
