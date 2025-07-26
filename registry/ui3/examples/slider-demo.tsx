'use client';

import React from 'react';
import Slider from '../ui/slider';

export default function SliderDemo() {
  const [value, setValue] = React.useState(0);
  const [value2, setValue2] = React.useState([25, 45]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <Slider
        className='w-64'
        value={value}
        onValueChange={(value) => setValue(value as number)}
      />
      <p>{value}</p>
      <Slider
        className='w-64'
        value={value2}
        onValueChange={(value) => setValue2(value as number[])}
      />
      <p>{value2.join(', ')}</p>
    </div>
  );
}
