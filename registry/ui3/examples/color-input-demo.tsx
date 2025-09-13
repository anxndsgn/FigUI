'use client';

import {
  ColorInput,
  ColorChit,
  ColorInputPrimitive,
  InputMultiRoot,
  NumericInputPrimitive,
} from '@/registry/ui3/ui/input';
import { useState } from 'react';

export default function ColorInputDemo() {
  const [color, setColor] = useState('000000');
  const [opacity, setOpacity] = useState(100);

  return (
    <div className='flex flex-col gap-2'>
      <ColorInput className='w-32' defaultValue={`${color}`} />
      <InputMultiRoot>
        <ColorInputPrimitive
          className='w-16'
          value={color}
          onChange={(e) => setColor(e.target.value)}
          iconLead={<ColorChit color={color} />}
        />
        <NumericInputPrimitive
          className='w-8'
          iconTrail={'%'}
          value={opacity}
          min={0}
          max={100}
          onValueChange={(next) => {
            const n = Number(next);
            if (Number.isFinite(n)) setOpacity(n);
          }}
        />
      </InputMultiRoot>
      <span className='text-sm text-gray-500'>{`#${color}-${opacity}%`}</span>
      <div
        className='size-12 rounded-lg'
        style={{ backgroundColor: `#${color}`, opacity: opacity / 100 }}
      />
      <span className='text-sm text-gray-500'>{color}</span>
    </div>
  );
}
