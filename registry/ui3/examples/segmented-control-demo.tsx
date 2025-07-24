'use client';

import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '../ui/segmented-control';
import { useState } from 'react';

export default function SegmentedControlDemo() {
  const [value, setValue] = useState('option1');
  return (
    <div className='flex flex-col gap-4'>
      <SegmentedControl
        defaultValue={value}
        onValueChange={() => setValue(value)}
      >
        <SegmentedControlItem value='option1'>List</SegmentedControlItem>
        <SegmentedControlItem value='option3'>Code</SegmentedControlItem>
      </SegmentedControl>

      <SegmentedControl>
        <SegmentedControlItem value='option1'>
          <AlignLeft className='size-3.5' />
        </SegmentedControlItem>
        <SegmentedControlItem value='option2'>
          <AlignCenter className='size-3.5' />
        </SegmentedControlItem>
        <SegmentedControlItem value='option3'>
          <AlignRight className='size-3.5' />
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  );
}
