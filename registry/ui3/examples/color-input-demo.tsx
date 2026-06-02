'use client';

import { ColorInput } from '@/registry/ui3/ui/input';
import { useState } from 'react';

export default function ColorInputDemo() {
  const [color, setColor] = useState('FF24BD');

  return (
    <div className='flex flex-col gap-2'>
      <ColorInput
        className='w-32'
        value={color}
        onValueChange={setColor}
      />
      <span className='text-sm text-gray-500'>{`#${color}`}</span>
      <div
        className='size-12 rounded-lg'
        style={{ backgroundColor: `#${color}` }}
      />
    </div>
  );
}
