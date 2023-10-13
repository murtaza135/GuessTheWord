import * as RadixUIAvatar from '@radix-ui/react-avatar';
import { BsFillPersonFill } from "react-icons/bs";
import upperFirst from "lodash/upperFirst";

type Props = {
  src?: string;
  alt: string;
  fallback?: string;
};

export function SmallAvatar({ src, alt, fallback }: Props) {
  return (
    <RadixUIAvatar.Root className="inline-flex justify-center items-center align-middle overflow-hidden select-none w-10 h-10 aspect-square rounded-full hover:opacity-75 transition-opacity">
      <RadixUIAvatar.Image
        className="w-full h-full object-cover rounded-full"
        src={src}
        alt={alt}
      />
      <RadixUIAvatar.Fallback
        className="relative w-full h-full flex justify-center items-center bg-white text-primary-900 font-semibold"
        delayMs={250}
      >
        {fallback
          ? (
            <p className="text-primary-900">
              {upperFirst(fallback.substring(0, 2))}
            </p>
          )
          : (
            <span className="absolute w-full h-full text-5xl -left-1 top-0.5 text-gray-400">
              <BsFillPersonFill />
            </span>
          )
        }
      </RadixUIAvatar.Fallback>
    </RadixUIAvatar.Root>
  );
}
