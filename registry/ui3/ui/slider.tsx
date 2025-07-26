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
      <BaseSlider.Control className='bg-grey-100 flex touch-none items-center rounded-full px-2 select-none'>
        <BaseSlider.Track className={cn('bg-grey-100 h-4 w-full select-none')}>
          <BaseSlider.Indicator
            className={cn(
              'bg-blue-500 select-none',
              'before:absolute before:top-0 before:bottom-0 before:left-0 before:w-2 before:-translate-x-full before:rounded-l-full before:bg-blue-500 before:content-[""]',
            )}
          />
          {Array.from({ length: _values.length }).map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              className={cn(
                'shadow-300 bg-white-1000 size-4 rounded-full select-none',
                'before:border-black-100 before:absolute before:top-1/2 before:right-1/2 before:size-2 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:bg-blue-500 before:content-[""]',
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export default Slider;
