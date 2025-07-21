'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@/registry/ui3/ui/radio';

export default function RadioDemo() {
  const [value, setValue] = useState('1');
  return (
    <RadioGroup
      className='typography-body-medium flex flex-col gap-2'
      value={value}
      onValueChange={(value) => setValue(value as string)}
    >
      <label htmlFor='1' className='flex items-center gap-2'>
        <Radio value='1' />
        <span>Option 1</span>
      </label>
      <label htmlFor='2' className='flex items-center gap-2'>
        <Radio value='2' />
        <span>Option 2</span>
      </label>
      <span>Selected: {value}</span>
    </RadioGroup>
  );
}
