import React from 'react';
import { Slider as BaseSlider } from '@base-ui-components/react';
import { cn } from '@/lib/utils';

function Slider({
  className,
  value,
  defaultValue,
  min,
  max,
  ...props
}: React.ComponentProps<typeof BaseSlider.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <BaseSlider.Root
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn('px-2', className)}
      {...props}
    >
      <BaseSlider.Control className='bg-grey-100 flex touch-none items-center select-none'>
        <BaseSlider.Track className='bg-grey-100 h-4 w-full select-none'>
          <BaseSlider.Indicator className='bg-blue-500 select-none' />
          {Array.from({ length: _values.length }).map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              className='shadow-300 bg-white-1000 size-4 rounded-full select-none'
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export default Slider;
