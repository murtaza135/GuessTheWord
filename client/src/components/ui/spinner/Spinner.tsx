import spinner from "./spinner.svg";
import defaultTheme from "tailwindcss/defaultTheme";

type FontSize = keyof typeof defaultTheme.fontSize;

type Props = {
  text?: string;
  alt?: string;
  imgSize?: number;
  textSize?: FontSize;
};

function Spinner({ text = "Loading", alt = "Loading...", imgSize = 200, textSize = "2xl" }: Props) {
  return (
    <span className='flex flex-col gap-0 items-center'>
      <img src={spinner} alt={alt} width={imgSize} />
      <p className={`text-primary-400 text-${textSize} font-semibold font-cursive -translate-y-4`}>
        {text}
      </p>
    </span>
  );
}

export default Spinner;