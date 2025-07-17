'use client';

import { Input } from '@/registry/ui3/ui/input';

export default function InputDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <Input placeholder='Input' className='w-32' />
      <Input placeholder='Input large' size='large' className='w-32' />
    </div>
  );
}
