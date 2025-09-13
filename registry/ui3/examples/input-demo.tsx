'use client';

import { TextInput, TextInputPrimitive } from '@/registry/ui3/ui/input';
import { InputMultiRoot } from '../ui/input';

export default function InputDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <TextInput placeholder='Input' className='w-32' />
      <TextInput placeholder='Input large' className='h-8 w-32' />
      <TextInput
        placeholder='Input'
        className='w-32'
        iconLead={
          <SearchIcon className='text-black-800 dark:text-white-800 size-6' />
        }
      />
      <TextInput
        placeholder='Input'
        className='h-8 w-32'
        iconLead={
          <SearchIcon className='text-black-800 dark:text-white-800 size-6' />
        }
      />
      <InputMultiRoot>
        <TextInputPrimitive placeholder='Input' className='w-32' />
        <TextInputPrimitive placeholder='Input' className='w-16' />
      </InputMultiRoot>
    </div>
  );
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01475 8.01472 6.00003 10.5 6.00003C12.9853 6.00003 15 8.01475 15 10.5ZM14.0444 14.7058C13.0872 15.5133 11.8504 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46246 7.46243 5.00003 10.5 5.00003C13.5376 5.00003 16 7.46246 16 10.5C16 11.8503 15.5134 13.087 14.706 14.0442C14.7596 14.0683 14.8098 14.1024 14.8538 14.1465L17.8538 17.1465C18.0491 17.3417 18.0491 17.6583 17.8538 17.8536C17.6585 18.0488 17.342 18.0488 17.1467 17.8536L14.1467 14.8536C14.1027 14.8095 14.0686 14.7594 14.0444 14.7058Z'
        fill='currentColor'
      />
    </svg>
  );
}
