import { Switch as BaseSwitch } from '@base-ui-components/react';
import React from 'react';
import { cn } from '@/lib/utils';

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof BaseSwitch.Root>) {
  return (
    <BaseSwitch.Root
      {...props}
      className={cn(
        'bg-grey-200 dark:bg-grey-600 data-disabled:bg-grey-300 dark:data-disabled:bg-grey-500 focus-visible:inset-ring-white-1000 relative inline-flex h-4 w-8 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out outline-none focus-visible:ring focus-visible:inset-ring-2 focus-visible:ring-blue-500 data-checked:bg-blue-500 dark:focus-visible:ring-blue-400',
        className,
      )}
    >
      <BaseSwitch.Thumb className='bg-white-1000 data-disabled:bg-white-1000 dark:data-disabled:bg-grey-800 size-3.5 rounded-full transition-transform duration-150 data-checked:translate-x-4' />
    </BaseSwitch.Root>
  );
}
