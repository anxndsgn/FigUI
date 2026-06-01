'use client';

import { cn } from '@/lib/utils';
import { Input as BaseInput } from '@base-ui/react';

// types
interface BaseInputProps extends React.ComponentProps<typeof BaseInput> {
  iconLead?: React.ReactNode;
  iconTrail?: React.ReactNode;
}

// component
function InputRoot({ className, children }: BaseInputProps) {
  return (
    <div
      className={cn(
        'placeholder:text-grey-400 text-black-800 bg-grey-100 typography-body-medium hover:ring-grey-200 dark:placeholder:text-grey-400 dark:bg-grey-700 dark:text-white-1000 dark:hover:ring-grey-600 flex h-6 w-full min-w-0 items-center rounded-md ring ring-transparent outline-none selection:bg-blue-500 focus-within:ring-blue-500 hover:focus-within:ring-blue-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:focus-within:ring-blue-500',
        'has-data-scrubbing:cursor-ew-resize has-data-scrubbing:!ring-blue-600 dark:has-data-scrubbing:!ring-blue-400',
        className,
      )}
    >
      {children}
    </div>
  );
}

function InputMultiRoot({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <InputRoot
      className={cn(
        'divide-white-1000 dark:divide-grey-800 flex divide-x [&>*:not(:last-child)]:pr-1',
        className,
      )}
    >
      {children}
    </InputRoot>
  );
}

export { InputRoot, InputMultiRoot, type BaseInputProps };
