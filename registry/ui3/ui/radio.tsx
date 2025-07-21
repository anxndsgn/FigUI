import { RadioGroup, Radio as BaseRadio } from '@base-ui-components/react';
import React from 'react';
import { cn } from '@/lib/utils';

function Radio({
  className,
  ...props
}: React.ComponentProps<typeof BaseRadio.Root>) {
  return (
    <BaseRadio.Root
      className={cn(
        'bg-white-1000 border-black-800 dark:border-white-1000 dark:bg-grey-800 data-[disabled]:border-grey-300 data-[disabled]:bg-grey-100 dark:data-[disabled]:border-grey-600 dark:data-[disabled]:bg-grey-700 size-4 shrink-0 rounded-full border outline-none focus-visible:border-blue-500 dark:focus-visible:border-blue-400',
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className='flex items-center justify-center'>
        <div className='bg-black-800 dark:bg-white-1000 size-2 rounded-full' />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}

export { Radio, RadioGroup };
