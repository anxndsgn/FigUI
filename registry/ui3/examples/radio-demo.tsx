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
      <label className='flex items-center gap-2'>
        <Radio value='1' />
        Option 1
      </label>
      <label className='flex items-center gap-2'>
        <Radio value='2' />
        Option 2
      </label>
      <span>Selected: {value}</span>
    </RadioGroup>
  );
}
