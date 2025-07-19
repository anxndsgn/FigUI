import { Checkbox as BaseCheckbox } from '@base-ui-components/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckbox.Root>) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'border-grey-200 bg-grey-100 data-[checked]:text-white-1000 size-4 shrink-0 rounded-md border outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed data-[checked]:border-blue-600 data-[checked]:bg-blue-500',
        'dark:border-grey-600 dark:bg-grey-700 dark:data-[checked]:border-blue-400 dark:data-[checked]:bg-blue-500',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className='flex items-center justify-center text-current transition-none'>
        <CheckIcon className='size-4 pb-0.5' />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox };
