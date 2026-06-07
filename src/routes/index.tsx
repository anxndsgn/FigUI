import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowUpRightIcon, PlusIcon } from 'lucide-react';
import { ThemeToggle } from '../components/site/theme-toggle';
import { Button } from 'registry/ui3/ui/button';
import { Checkbox } from 'registry/ui3/ui/checkbox';
import { TextInput } from 'registry/ui3/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from 'registry/ui3/ui/select';
import { Slider } from 'registry/ui3/ui/slider';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function GithubIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      width='24'
      height='24'
      aria-hidden='true'
    >
      <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.06c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.99 0 1.98.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.05.78 2.13v3.16c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' />
    </svg>
  );
}

function HomePage() {
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
            <a
              href='https://github.com/anxndsgn/figui'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
            </a>
          }
        />
        <Button render={<Link to='/docs'>Docs</Link>} />
      </div>
      <main className='grid flex-1 grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='relative col-span-1 row-span-2 flex min-h-[450px] flex-col gap-4 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typography-body-large'>Button</h2>
            <Button
              render={
                <Link
                  to='/docs/$'
                  params={{ _splat: 'components/button' }}
                >
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
                <Link
                  to='/docs/$'
                  params={{ _splat: 'components/checkbox' }}
                >
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
                <Link
                  to='/docs/$'
                  params={{ _splat: 'components/inputs/text-input' }}
                >
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
                <Link
                  to='/docs/$'
                  params={{ _splat: 'components/slider' }}
                >
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
          render={<Link to='/docs'>Find More</Link>}
          size='large'
          className='col-span-full'
        />
      </main>
    </div>
  );
}
