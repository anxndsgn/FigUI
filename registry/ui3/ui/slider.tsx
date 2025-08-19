import { cn } from '@/lib/utils';
import { Slider as BaseSlider } from '@base-ui-components/react';
import React from 'react';

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
      {...props}
    >
      <BaseSlider.Control
        className={cn(
          'bg-grey-100 dark:bg-grey-700 dark:inset-ring-grey-600 inset-ring-grey-200 flex w-32 touch-none items-center rounded-full px-2 inset-ring select-none',
          className,
        )}
      >
        <BaseSlider.Track className={cn('h-4 w-full select-none')}>
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
                'shadow-100 bg-white-1000 size-4 rounded-full select-none',
                'before:border-black-100 before:absolute before:top-1/2 before:right-1/2 before:size-2 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:bg-blue-500 before:content-[""]',
              )}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

interface ColorRangeSliderProps
  extends Omit<
    React.ComponentProps<typeof BaseSlider.Root>,
    'value' | 'defaultValue' | 'min' | 'max' | 'onValueChange' | 'children'
  > {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (
    value: number,
    event: Event,
    activeThumbIndex: number,
  ) => void;
}

function ColorRangeSlider({
  className,
  value,
  defaultValue = 0,
  min = 0,
  max = 360,
  step = 1,
  onValueChange,
  ...props
}: ColorRangeSliderProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<number>(
    defaultValue ?? 0,
  );

  React.useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const handleValueChange = React.useCallback(
    (next: number | number[], event: Event, activeThumbIndex: number) => {
      const nextNumber = Array.isArray(next) ? (next[0] ?? 0) : next;
      if (!isControlled) setInternalValue(nextNumber);
      onValueChange?.(nextNumber, event, activeThumbIndex);
    },
    [isControlled, onValueChange],
  );

  const hue = isControlled ? (value as number) : internalValue;

  return (
    <BaseSlider.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      {...props}
    >
      <BaseSlider.Control
        className={cn(
          'inset-ring-black-100 flex w-32 touch-none items-center rounded-full px-2 inset-ring select-none',
          '[background-image:linear-gradient(to_right,#FF0000_0%,#FFA800_13%,#FFFF00_22%,#00FF00_34%,#00FFFF_50%,#0000FF_66%,#FF00FF_82%,#FF0000_100%)]',
          className,
        )}
      >
        <BaseSlider.Track
          className={cn('relative h-4 w-full rounded-full select-none')}
        >
          <BaseSlider.Thumb
            className={cn(
              'shadow-100 bg-white-1000 size-4 rounded-full select-none',
              'before:border-black-100 before:absolute before:top-1/2 before:right-1/2 before:size-2 before:translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:border before:content-[""]',
              'before:[background-color:var(--thumb-color)]',
            )}
            style={
              {
                '--thumb-color': `hsl(${hue}, 100%, 50%)`,
              } as React.CSSProperties
            }
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

export { ColorRangeSlider, Slider };
