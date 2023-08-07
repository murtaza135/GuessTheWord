import Letter from './Letter';
import letters from '@/utils/letters';
import LetterValue from '@/types/Letter';

type Props = {
  onClick?: (letter: LetterValue, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Keyboard({ onClick }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {letters.map((letter) => <Letter key={letter} value={letter} onClick={onClick} />)}
    </div>
  );
}
