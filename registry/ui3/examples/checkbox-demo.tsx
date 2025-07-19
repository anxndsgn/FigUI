'use client';

import { Checkbox } from '@/registry/ui3/ui/checkbox';
import { useState } from 'react';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <label htmlFor='checkbox' className='flex items-center gap-2'>
        <Checkbox
          id='checkbox'
          checked={checked}
          onCheckedChange={setChecked}
        />
        <span className='text-sm font-medium'>Checkbox</span>
      </label>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-grey-500'>
          Checkbox is {checked ? 'checked' : 'unchecked'}
        </p>
      </div>
    </div>
  );
}
