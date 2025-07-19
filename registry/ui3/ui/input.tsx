import * as React from 'react';
import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'placeholder:text-grey-400 border border-transparent selection:bg-blue-500 text-black-800 flex w-full min-w-0 rounded-md bg-grey-100 px-2 typography-body-medium outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-grey-200 focus-visible:border-blue-500 aria-invalid:ring-red-500/20 aria-invalid:border-red-500 dark:placeholder:text-grey-400 dark:bg-grey-700 dark:text-white-1000 dark:hover:border-grey-600 dark:focus-visible:border-blue-500',
  {
    variants: {
      size: {
        default: 'h-6',
        large: 'h-8',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

function Input({ className, type, size, ...props }: InputProps) {
  return (
    <BaseInput
      type={type}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
}

export { Input };
