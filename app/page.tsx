'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/registry/ui3/ui/button';
import { Checkbox } from '@/registry/ui3/ui/checkbox';
import { Input } from '@/registry/ui3/ui/input';
import { GithubIcon, PlusIcon, ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className='mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-12'>
      <header className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h1 className='typography-display'>FigUI (WIP)</h1>
        </div>
        <p className='typography-heading-medium'>
          Open Source Figma UI3 Components
        </p>
      </header>
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <Button
          variant='ghost'
          size='icon'
          render={
            <a href='https://github.com/anxndsgn/figui' target='_blank'>
              <GithubIcon />
            </a>
          }
        />
        <Button render={<Link href='/docs'>Docs</Link>} />
      </div>
      <main className='grid flex-1 grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='relative col-span-1 row-span-2 flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-muted-foreground text-sm sm:pl-3'>Button</h2>
            <Button
              render={
                <Link href='/docs/components/button'>
                  Docs <ArrowUpRightIcon />
                </Link>
              }
              variant='secondary'
            />
          </div>
          <div className='relative flex min-h-[400px] flex-col items-center justify-center gap-4'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='secondaryDestruct'>SecondaryDestruct</Button>
            <Button variant='inverse'>Inverse</Button>
            <Button variant='success'>Success</Button>
            <Button variant='link'>Link</Button>
            <Button variant='linkDanger'>LinkDanger</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='ghost' size='icon'>
              <PlusIcon />
            </Button>
          </div>
        </div>
        <div className='relative col-span-1 row-span-1 flex min-h-32 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-muted-foreground text-sm sm:pl-3'>Checkbox</h2>
            <Button
              render={
                <Link href='/docs/components/checkbox'>
                  Docs <ArrowUpRightIcon />
                </Link>
              }
              variant='secondary'
            />
          </div>
          <div className='relative flex min-h-24 flex-col items-center justify-center gap-4'>
            <label htmlFor='checkbox' className='flex items-center gap-2'>
              <Checkbox id='checkbox' />
              <span className='typography-body-medium'>Checkbox</span>
            </label>
          </div>
        </div>
        <div className='relative col-span-1 row-span-1 flex min-h-32 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-muted-foreground text-sm sm:pl-3'>Input</h2>
            <Button
              render={
                <Link href='/docs/components/input'>
                  Docs <ArrowUpRightIcon />
                </Link>
              }
              variant='secondary'
            />
          </div>
          <div className='relative flex min-h-24 flex-col items-center justify-center gap-4'>
            <Input id='input' placeholder='Input' className='max-w-32' />
          </div>
        </div>

        <Button
          render={<Link href='/docs'>Find More</Link>}
          size={'large'}
          className='col-span-full'
        />
      </main>
    </div>
  );
}
