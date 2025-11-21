import {
  CircleIcon,
  DiamondIcon,
  SquareIcon,
  TriangleRightIcon,
} from 'lucide-react';
import { Item } from './item';
import { cn } from '@/lib/utils';

function noteIcon(note: string | null) {
  switch (note) {
    case 'f':
      return <TriangleRightIcon aria-label="Fa" />;
    case 's':
      return <CircleIcon aria-label="So" />;
    case 'l':
      return <SquareIcon aria-label="La" />;
    case 'm':
      return <DiamondIcon aria-label="Mi" />;
    default:
      return null;
  }
}

export function ShapeNoteDisplay({
  notes,
  highlightIndex,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  notes: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
    seventh: string;
    eighth: string;
  };
  highlightIndex: number;
}) {
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-4 sm:grid-cols-8 text-base font-medium'
      )}
      {...props}
    >
      {Object.entries(notes).map(([key, value], i) => (
        <Item
          key={`snd-item-${key}`}
          className={i === highlightIndex ? 'text-green-600' : ''}
        >
          {noteIcon(value) || <p className="w-full text-center">{i + 1}</p>}
        </Item>
      ))}
    </div>
  );
}
