import {
  CircleIcon,
  DiamondIcon,
  SquareIcon,
  TriangleRightIcon,
} from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function ShapeNoteInput({
  handleShapeNote,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  handleShapeNote: (note: string) => void;
}) {
  return (
    <div className={cn(className, 'flex flex-row gap-4')} {...props}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShapeNote('f')}
      >
        <TriangleRightIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShapeNote('s')}
      >
        <CircleIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShapeNote('l')}
      >
        <SquareIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShapeNote('m')}
      >
        <DiamondIcon />
      </Button>
    </div>
  );
}
