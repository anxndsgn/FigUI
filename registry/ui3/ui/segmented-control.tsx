import * as React from 'react';
import { Radio } from '@base-ui-components/react/radio';
import { RadioGroup } from '@base-ui-components/react/radio-group';
import { cn } from '@/lib/utils';

function SegmentedControl({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup
      className={cn(
        'bg-grey-100 dark:bg-grey-700 flex w-fit rounded-md',
        className,
      )}
      {...props}
    >
      {props.children}
    </RadioGroup>
  );
}

function SegmentedControlItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      className={cn(
        'data-checked:inset-ring-grey-200 text-black-500 data-checked:bg-white-1000 typography-body-medium dark:text-white-500 dark:data-checked:bg-grey-800 dark:data-checked:inset-ring-grey-600 data-checked:border-grey-200 data-checked:text-black-1000 dark:data-checked:text-white-1000 data-disabled:text-black-400 dark:data-disabled:text-white-400 flex h-6 items-center rounded-md px-2 outline-none focus-visible:inset-ring focus-visible:inset-ring-blue-500 data-checked:inset-ring focus-visible:data-checked:inset-ring-blue-500',
        className,
      )}
      {...props}
    >
      {children}
    </Radio.Root>
  );
}

export { SegmentedControl, SegmentedControlItem };
