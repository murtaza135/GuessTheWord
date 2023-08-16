import Key from './Key';
import letters from '@/utils/letters';
import Letter from '@/types/Letter';

type Props = {
  onClick?: (letter: Letter, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function Keyboard({ onClick }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {letters.map((letter) => <Key key={letter} value={letter} onClick={onClick} />)}
    </div>
  );
}
