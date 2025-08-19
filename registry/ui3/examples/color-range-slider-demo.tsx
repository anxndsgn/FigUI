'use client';

import { ColorRangeSlider } from '@/registry/ui3/ui/slider';
import { useState } from 'react';

export default function ColorRangeSliderDemo() {
  const [hue, setHue] = useState([180]);

  // Convert hue to HSL color
  const selectedColor = `hsl(${hue[0]}, 100%, 50%)`;

  return (
    <div className='flex flex-col gap-6'>
      <div className='space-y-2'>
        <label className='text-sm font-medium text-gray-900 dark:text-gray-100'>
          Hue
        </label>
        <ColorRangeSlider
          value={hue}
          onValueChange={(value) =>
            setHue(Array.isArray(value) ? value : [value])
          }
          className={'w-56'}
        />
      </div>

      <div className='flex items-center gap-3'>
        <div
          className='h-12 w-12 rounded-lg border border-gray-200 dark:border-gray-700'
          style={{ backgroundColor: selectedColor }}
        />
        <div className='text-sm'>
          <div className='font-medium text-gray-900 dark:text-gray-100'>
            Hue: {hue[0]}°
          </div>
          <div className='text-gray-500 dark:text-gray-400'>
            {selectedColor}
          </div>
        </div>
      </div>
    </div>
  );
}
