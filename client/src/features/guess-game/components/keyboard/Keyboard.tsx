import { Key } from '@/features/guess-game/components/keyboard/Key';
import { letters } from '@/features/guess-game/utils/letters';
import { Letter } from '@/features/guess-game/types';

type Props = {
  onClick?: (letter: Letter, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function Keyboard({ onClick }: Props) {
  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {letters.map((letter) => <Key key={letter} value={letter} onClick={onClick} />)}
    </div>
  );
}
