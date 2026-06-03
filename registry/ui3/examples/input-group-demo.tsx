'use client';

import { useState } from 'react';
import {
  TextInput,
  NumericInputRoot,
  NumericScrubArea,
  NumericInput,
  ColorInput,
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
} from '@/registry/ui3/ui/input';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

export default function InputGroupDemo() {
  const [color, setColor] = useState('FF24BD');

  return (
    <div className='flex flex-col gap-4'>
      {/* 1. Icon addon + TextInput */}
      <div className='flex flex-col gap-1'>
        <span className='typography-body-medium text-grey-500'>
          Icon + Text Input
        </span>
        <InputGroup className='w-48'>
          <InputGroupAddon>
            <SearchIcon className='text-grey-500' />
          </InputGroupAddon>
          <TextInput placeholder='Search...' />
        </InputGroup>
      </div>

      {/* 2. Color chit + ColorInput */}
      <div className='flex flex-col gap-1'>
        <span className='typography-body-medium text-grey-500'>
          Color Chit + Color Input
        </span>
        <InputGroup className='w-36'>
          <InputGroupAddon>
            <div
              className='size-3 rounded-sm'
              style={{ backgroundColor: `#${color}` }}
            />
          </InputGroupAddon>
          <ColorInput value={color} onValueChange={setColor} />
        </InputGroup>
      </div>

      {/* 3. ScrubArea + NumericInput (Root wraps Group) */}
      <div className='flex flex-col gap-1'>
        <span className='typography-body-medium text-grey-500'>
          Scrub Area + Numeric Input
        </span>
        <NumericInputRoot defaultValue={50} min={0} max={100}>
          <InputGroup className='w-32'>
            <InputGroupAddon>
              <NumericScrubArea className='text-grey-500 flex size-6 items-center justify-center text-xs'>
                X
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </InputGroup>
        </NumericInputRoot>
      </div>

      {/* 4. Multi-input: color + opacity */}
      <div className='flex flex-col gap-1'>
        <span className='typography-body-medium text-grey-500'>
          Color + Opacity (mixed types)
        </span>
        <InputGroup className='w-52'>
          <InputGroupAddon>
            <div
              className='size-3 rounded-sm'
              style={{ backgroundColor: `#${color}` }}
            />
          </InputGroupAddon>
          <ColorInput value={color} onValueChange={setColor} />
          <InputGroupDivider />
          <NumericInputRoot defaultValue={100} min={0} max={100}>
            <NumericInput className='w-10' />
            <InputGroupAddon className='text-grey-500 typography-body-medium text-xs'>
              <NumericScrubArea>%</NumericScrubArea>
            </InputGroupAddon>
          </NumericInputRoot>
        </InputGroup>
      </div>

      {/* 5. XYZ multi-numeric (each Root is a child) */}
      <div className='flex flex-col gap-1'>
        <span className='typography-body-medium text-grey-500'>
          XYZ Multi-Numeric
        </span>
        <InputGroup className='w-64'>
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className='text-grey-500 flex size-6 items-center justify-center text-xs'>
                X
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
          <InputGroupDivider />
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className='text-grey-500 flex size-6 items-center justify-center'>
                Y
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
          <InputGroupDivider />
          <NumericInputRoot defaultValue={0}>
            <InputGroupAddon>
              <NumericScrubArea className='text-grey-500 flex size-6 items-center justify-center'>
                Z
              </NumericScrubArea>
            </InputGroupAddon>
            <NumericInput />
          </NumericInputRoot>
        </InputGroup>
      </div>
    </div>
  );
}
