'use client';

import {
  ColorInput,
  ColorInputPrimitive,
  InputMultiWrapper,
  NumericInputPrimitive,
} from '@/registry/ui3/ui/input';
import { useState } from 'react';

export default function ColorInputDemo() {
  const [color, setColor] = useState('000000');
  return (
    <div className='flex flex-col gap-2'>
      <ColorInput
        className='w-32'
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <InputMultiWrapper>
        <ColorInputPrimitive
          className='w-32'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          colorChit
        />
        <NumericInputPrimitive className='w-32' />
      </InputMultiWrapper>
      <div
        className='size-12 rounded-lg'
        style={{ backgroundColor: `#${color}` }}
      />
      <span className='text-sm text-gray-500'>{color}</span>
    </div>
  );
}
