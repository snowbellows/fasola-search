'use client';

import * as React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Item } from '@/components/ui/item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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

      // const data = await response.json();
      // setSearchData(data.results);
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
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-24 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Fa So La Search
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Search for Sacred Harp songs by tune.
          </p>
        </div>
        <div className="flex flex-row gap-4 text-base font-medium">
          <Button variant="outline" size="icon" onClick={() => updateNote('f')}>
            Fa
          </Button>
          <Button variant="outline" size="icon" onClick={() => updateNote('s')}>
            So
          </Button>
          <Button variant="outline" size="icon" onClick={() => updateNote('l')}>
            La
          </Button>
          <Button variant="outline" size="icon" onClick={() => updateNote('m')}>
            Mi
          </Button>
          <Button onClick={() => handleClear()}>
            <ArrowLeftIcon></ArrowLeftIcon>
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2 text-base font-medium ">
          {Object.entries(notes).map(([key, value], i) => (
            <Item
              key={key}
              className={i === currentNoteIndex ? 'text-green-600' : ''}
            >
              {value || i + 1}
            </Item>
          ))}
        </div>
        <ScrollArea className="border max-h-50 h-50 w-full mt-8">
          {loading && <p>Loading...</p>}
          {searchData &&
            searchData.map((part) => (
              <React.Fragment key={part.partId}>
                <Item>
                  {part.songNumber} - {part.songName} ({part.name})
                </Item>
                <Separator />
              </React.Fragment>
            ))}
        </ScrollArea>
      </main>
    </div>
  );
}
