'use client';

import React from 'react';
import Slider from '../ui/slider';

export default function SliderDemo() {
  const [value, setValue] = React.useState(0);

  return (
    <div className='flex flex-col gap-4'>
      <Slider
        className='w-64'
        value={value}
        onValueChange={(value) => setValue(value as number)}
      />
      <Slider className='w-64' defaultValue={[25, 45]} />
      <p className='text-grey-600 text-sm'>{value}</p>
    </div>
  );
}
