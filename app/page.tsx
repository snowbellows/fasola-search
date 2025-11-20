'use client';

import * as React from 'react';
import {
  CircleIcon,
  TriangleRightIcon,
  SquareIcon,
  DiamondIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Item } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShapeNoteInput } from '@/components/ui/shape-note-input';
import { ShapeNoteDisplay } from '@/components/ui/shape-note-display';

interface SongPart {
  songNumber: string;
  songName: string;
  name: string;
  partId: number;
}

export default function Home() {
  const [notes, setNotes] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  });

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [searchData, setSearchData] = useState<SongPart[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams();
      Object.entries(notes).forEach(([key, value]) => {
        if (value) {
          urlParams.append(key, value);
        }
      });
      const apiUrl = `/api/search?${urlParams.toString()}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
      });
      const data = await response.json();
      setSearchData(data.results);
      setLoading(false);
    };
    fetchData();
  }, [notes]);

  function updateNote(note: string) {
    const noteKeys = Object.keys(notes);

    const key = noteKeys[currentNoteIndex];
    setNotes((prevNotes) => ({
      ...prevNotes,
      [key]: note,
    }));
    if (currentNoteIndex < noteKeys.length - 1) {
      setCurrentNoteIndex(currentNoteIndex + 1);
    } else {
      setCurrentNoteIndex(0);
    }
  }

  function handleClear() {
    setNotes({
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
    });
    setCurrentNoteIndex(0);
    setSearchData(null);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-green-950 dark:text-green-50">
            Fa So La Search
          </h1>
          <p className="max-w-md text-lg leading-8 text-green-950 dark:text-green-50">
            Search for Sacred Harp songs by tune.
          </p>
        </div>
        <ShapeNoteInput
          className="mt-10 text-base font-medium"
          handleShapeNote={updateNote}
        />
        <ShapeNoteDisplay
          notes={notes}
          highlightIndex={currentNoteIndex}
          className="w-full sm:w-100 mt-5"
        />
        <div className="mt-5">
          <Button onClick={() => handleClear()}>Clear</Button>
        </div>
        <ScrollArea className="border max-h-50 h-40 w-full mt-8 rounded-md">
          {searchData && searchData.length > 0 ? (
            searchData.map((part) => (
              <React.Fragment key={part.partId}>
                <Item className="min-w-4">
                  {part.songNumber} - {part.songName} ({part.name})
                </Item>
                <Separator />
              </React.Fragment>
            ))
          ) : loading ? (
            <Item>Loading...</Item>
          ) : (
            <Item>No results found.</Item>
          )}
        </ScrollArea>
      </main>
    </div>
  );
}
