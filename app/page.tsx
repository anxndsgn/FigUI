'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/registry/ui3/ui/button';
import { Checkbox } from '@/registry/ui3/ui/checkbox';
import { TextInput } from '@/registry/ui3/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/registry/ui3/ui/select';
import { Slider } from '@/registry/ui3/ui/slider';
import { ArrowUpRightIcon, GithubIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';

// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className='mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-12'>
      <header className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <h1 className='typography-display'>FigUI</h1>
        </div>
        <p className='typography-heading-medium'>
          Figma UI3 Components for your Figma plugins
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
            <h2 className='typography-body-large'>Button</h2>
            <Button
              render={
                <Link href='/docs/components/button'>
                  Docs <ArrowUpRightIcon />
                </Link>
              }
              variant='secondary'
            />
          </div>
          <div className='relative flex min-h-24 flex-col items-center justify-center gap-4'>
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
        <div className='relative col-span-1 row-span-1 flex min-h-24 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typography-body-large'>Checkbox</h2>
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
        <div className='relative col-span-1 row-span-1 flex min-h-24 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typography-body-large'>Input</h2>
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
            <TextInput id='input' placeholder='Input' className='max-w-32' />
          </div>
        </div>
        <div className='relative col-span-1 row-span-1 flex min-h-24 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typography-body-large'>Slider</h2>
            <Button
              render={
                <Link href='/docs/components/slider'>
                  Docs <ArrowUpRightIcon />
                </Link>
              }
              variant='secondary'
            />
          </div>
          <div className='relative flex min-h-24 flex-col items-center justify-center gap-4'>
            <Slider />
          </div>
        </div>
        <div className='relative col-span-1 row-span-1 flex min-h-24 flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typography-body-large'>Select</h2>
          </div>
          <div className='relative flex min-h-24 flex-col items-center justify-center gap-4'>
            <Select
              items={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ]}
              defaultValue='option1'
            >
              <SelectTrigger className='w-32'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='option1'>
                  <SelectItemText>Option 1</SelectItemText>
                </SelectItem>
                <SelectItem value='option2'>
                  <SelectItemText>Option 2</SelectItemText>
                </SelectItem>
                <SelectItem value='option3'>
                  <SelectItemText>Option 3</SelectItemText>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant='secondary'
          render={
            <Link href='https://www.figma.com/community/plugin/1518650987829710592'>
              FigUI in real
            </Link>
          }
          size={'large'}
          className='col-span-full'
        />
        <Button
          render={<Link href='/docs'>Find More</Link>}
          size={'large'}
          className='col-span-full'
        />
      </main>
    </div>
  );
}
