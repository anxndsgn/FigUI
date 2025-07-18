'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/registry/ui3/ui/button';
import { GithubIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className='max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8'>
      <header className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h1 className='typography-heading-large'>FigUI (WIP)</h1>
        </div>
        <p className='typography-body-large'>
          Open Source Figma UI3 Components
        </p>
      </header>
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <Button variant='ghost' size='icon'>
          <a href='https://github.com/anxndsgn/figui' target='_blank'>
            <GithubIcon />
          </a>
        </Button>
        <Button>
          <Link href='/docs'>Docs</Link>
        </Button>
      </div>
      <main className='flex flex-col flex-1 gap-8'>
        <div className='flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative'>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm text-muted-foreground sm:pl-3'>Button</h2>
          </div>
          <div className='flex flex-col gap-4 items-center justify-center min-h-[400px] relative '>
            <Button variant='primary'>Button</Button>
            <Button variant='secondary'>Button</Button>
            <Button variant='destructive'>Button</Button>
            <Button variant='secondaryDestruct'>Button</Button>
            <Button variant='inverse'>Button</Button>
            <Button variant='success'>Button</Button>
            <Button variant='link'>Button</Button>
            <Button variant='linkDanger'>Button</Button>
            <Button variant='ghost'>Button</Button>
            <Button variant='ghost' size='icon'>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
