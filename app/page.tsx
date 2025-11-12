'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Item } from '@/components/ui/item';

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
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
          <Button>
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
      </main>
    </div>
  );
}
