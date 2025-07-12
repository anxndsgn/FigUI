'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/registry/ui3/ui/button';
import { useState } from 'react';

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className='max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8'>
      <header className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold tracking-tight'>Custom Registry</h1>
        <p className='text-muted-foreground'>
          A custom registry for distributing code using shadcn.
        </p>
        <ThemeToggle />
      </header>
      <main className='flex flex-col flex-1 gap-8'>
        <div className='flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm text-muted-foreground sm:pl-3'>Button</h2>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center min-h-[400px] relative '>
            <Button variant='primary'>Click me</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
