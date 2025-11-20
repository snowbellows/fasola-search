import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { Item } from './item';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SongPart {
  songNumber: string;
  songName: string;
  name: string;
  partId: number;
}

export function ShapeNoteList({
  parts,
  loading,
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea> & {
  parts: SongPart[] | null;
  loading: boolean;
}) {
  return (
    <ScrollArea className={cn(className, 'border rounded-md')} {...props}>
      {loading ? (
        <Item>Loading...</Item>
      ) : parts && parts.length > 0 ? (
        parts.map((part) => (
          <React.Fragment key={part.partId}>
            <Item className="min-w-4">
              {part.songNumber} - {part.songName} ({part.name})
            </Item>
            <Separator />
          </React.Fragment>
        ))
      ) : (
        <Item>No results found.</Item>
      )}
    </ScrollArea>
  );
}
