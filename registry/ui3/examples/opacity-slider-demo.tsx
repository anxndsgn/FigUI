'use client';

import { Input } from '@/registry/ui3/ui/input';
import { OpacitySlider } from '@/registry/ui3/ui/slider';
import { useState } from 'react';

export default function OpacitySliderDemo() {
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState('#FF0505');

  return (
    <div className='flex flex-col gap-6'>
      <Input value={color} onChange={(e) => setColor(e.target.value)} />
      <OpacitySlider
        value={opacity}
        onValueChange={setOpacity}
        color={color}
        className='w-56'
      />
      <span className='text-sm text-gray-500'>
        opacity: {opacity.toFixed(2)}
      </span>
    </div>
  );
}
