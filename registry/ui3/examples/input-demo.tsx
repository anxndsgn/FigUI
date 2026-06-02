'use client';

import { TextInput } from '@/registry/ui3/ui/input';

export default function InputDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <TextInput placeholder='Input' className='w-32' />
      <TextInput placeholder='Input large' className='h-8 w-32' />
    </div>
  );
}
