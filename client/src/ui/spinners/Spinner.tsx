import spinner from "./spinner.svg";
import spinnerDark from "./spinner-dark.svg"
import defaultTheme from "tailwindcss/defaultTheme";
import cn from '@/utils/cn';

type FontSize = keyof typeof defaultTheme.fontSize;

type Props = {
  text?: string;
  alt?: string;
  imgSize?: number;
  textSize?: FontSize;
  dark?: boolean;
};

function Spinner({ text = "Loading", alt = "Loading", imgSize = 100, textSize = "lg", dark = false }: Props) {
  return (
    <span className='flex flex-col gap-0 items-center'>
      <img src={dark ? spinnerDark : spinner} alt={alt} width={imgSize} />
      <p className={cn(dark ? 'text-gray-950' : 'text-gray-50', `text-${textSize} font-semibold font-cursive -translate-y-4`)}>
        {text}
      </p>
    </span>
  );
}

export default Spinner;