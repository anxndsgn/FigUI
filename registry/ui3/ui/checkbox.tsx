'use client';

import {
  Checkbox as BaseCheckbox,
  CheckboxGroup,
} from '@base-ui-components/react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon, MinusIcon } from 'lucide-react';

function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'group border-grey-200 bg-grey-100 data-checked:text-white-1000 data-indeterminate:text-white-1000 dark:border-grey-600 dark:bg-grey-700 data-disabled:bg-grey-300 dark:data-disabled:bg-grey-500 data-checked:focus-visible:inset-ring-white-1000 size-4 shrink-0 rounded-md border outline-none focus-visible:border-blue-500 disabled:cursor-not-allowed data-checked:border-blue-600 data-checked:bg-blue-500 data-checked:focus-visible:inset-ring data-disabled:border-none data-indeterminate:border-blue-600 data-indeterminate:bg-blue-500 dark:focus-visible:border-blue-400 dark:data-checked:border-blue-400 dark:data-checked:bg-blue-500 dark:data-indeterminate:border-blue-400',
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        className='group-data-[disabled]:text-white-1000 dark:group-data-disabled:text-grey-800 flex items-center justify-center text-current transition-none [&__svg]:size-4 [&_svg]:pb-[1px]'
        render={(props, state) => (
          <span {...props}>
            {state.indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        )}
      ></BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox, CheckboxGroup };
