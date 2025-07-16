'use client';

import { TextInput } from '@/registry/ui3/ui/input';

export default function InputDemo() {
  return (
    <div className='flex flex-col flex-wrap items-center gap-2'>
      <TextInput placeholder='Singleline' className='w-20' />
      <TextInput placeholder='Singleline large' size='large' className='w-32' />
      <TextInput placeholder='Multiline' variant='multiline' className='w-32' />
    </div>
  );
}
