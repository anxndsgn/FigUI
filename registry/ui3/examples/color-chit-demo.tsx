'use client';

import { useState } from 'react';
import {
  ColorChit,
  ColorInput,
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
  NumericInputRoot,
  NumericInput,
  NumericScrubArea,
} from '@/registry/ui3/ui/input';

export default function ColorChitDemo() {
  const [color, setColor] = useState('FF24BD');
  const [opacity, setOpacity] = useState(72);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-3'>
        <ColorChit color={color} />
        <ColorChit color={color} opacity={opacity} />
        <ColorChit color={color} opacity={100} />
      </div>

      <InputGroup className='w-52'>
        <InputGroupAddon>
          <ColorChit color={color} opacity={opacity} />
        </InputGroupAddon>
        <ColorInput value={color} onValueChange={setColor} />
        <InputGroupDivider />
        <NumericInputRoot
          value={opacity}
          min={0}
          max={100}
          onValueChange={(next) => setOpacity(Number(next) || 0)}
        >
          <NumericInput className='w-10' />
          <InputGroupAddon className='text-grey-500 typography-body-medium text-xs'>
            <NumericScrubArea>%</NumericScrubArea>
          </InputGroupAddon>
        </NumericInputRoot>
      </InputGroup>
    </div>
  );
}
