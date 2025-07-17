import * as React from 'react';
import { Input as BaseInput } from '@base-ui-components/react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  [
    'placeholder:text-(--color-text-tertiary)',
    'border border-transparent selection:bg-(--color-bg-selected)',
    'text-(--color-text) flex w-full min-w-0',
    'rounded-(--radius-medium) bg-(--color-bg-secondary)',
    'px-(--spacer-2) typography-body-medium outline-none',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'hover:border-(--color-border) focus-visible:border-(--color-border-selected)',
    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
  ],
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
