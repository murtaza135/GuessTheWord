import * as RadixUIAvatar from '@radix-ui/react-avatar';
import cn from '@/utils/cn';

type Props = {
  src?: string;
  alt: string;
  fallback?: string;
  className?: string;
};

export default function Avatar({ src, alt, fallback, className }: Props) {
  return (
    <RadixUIAvatar.Root className="inline-flex justify-center items-center align-middle overflow-hidden select-none w-10 h-10 aspect-square rounded-full">
      <RadixUIAvatar.Image
        className="w-full h-full object-cover rounded-full"
        src={src}
        alt={alt}
      />
      <RadixUIAvatar.Fallback
        className={cn("w-full h-full flex justify-center items-center bg-white text-primary-900 font-semibold", className)}
        delayMs={600}
      >
        {fallback?.substring(0, 2) ?? alt.substring(0, 2)}
      </RadixUIAvatar.Fallback>
    </RadixUIAvatar.Root>
  );
}
