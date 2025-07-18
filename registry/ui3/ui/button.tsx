import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const solidFocusRing =
  'focus-visible:inset-ring-2 focus-visible:inset-ring-white-1000';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-medium typography-body-medium disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary: cn(
          'bg-blue-500 text-white-1000 active:bg-blue-600 dark:active:inset-ring dark:active:inset-ring-blue-500 disabled:bg-grey-500',
          solidFocusRing
        ),
        secondary:
          'text-black-800 border border-grey-200 active:bg-grey-100 active:border-grey-300 disabled:border-grey-300 disabled:text-grey-500 dark:text-white-1000 dark:border-grey-600 dark:active:bg-grey-700 dark:active:border-grey-600 dark:disabled:border-grey-700 dark:disabled:text-grey-400 focus-visible:inset-ring focus-visible:inset-ring-blue-500 focus-visible:border-none',
        destructive: cn(
          'bg-red-500 text-white-1000 active:bg-red-600 active:outline dark:active:outline-red-500 active:-outline-offset-1 disabled:bg-grey-500',
          solidFocusRing
        ),
        secondaryDestruct:
          'border border-red-300 text-red-500 active:bg-grey-100  disabled:border-red-600 disabled:text-red-400 dark:border-red-700 dark:active:border-red-600 dark:text-red-300 dark:active:bg-grey-700 focus-visible:inset-ring focus-visible:inset-ring-blue-500 focus-visible:border-none',
        inverse: cn(
          'bg-black-1000 text-white-1000 disabled:bg-grey-500 dark:bg-white-1000 dark:text-black-1000',
          solidFocusRing
        ),
        success: cn(
          'bg-green-500 text-white-1000 active:bg-green-600 active:outline dark:active:outline-green-500 active:-outline-offset-1 disabled:bg-grey-500',
          solidFocusRing
        ),
        link: 'text-blue-600 active:bg-blue-200 dark:active:bg-pale-blue-800 dark:text-blue-400 focus-visible:inset-ring focus-visible:inset-ring-blue-500 disabled:text-grey-500',
        linkDanger:
          'text-red-600 active:bg-red-200 disabled:text-red-400 focus-visible:inset-ring focus-visible:inset-ring-red-300 dark:text-red-400 dark:active:bg-pale-red-800 dark:focus-visible:inset-ring-red-700',
        ghost:
          'hover:bg-black-200 active:bg-black-1000/15 disabled:text-grey-500 focus-visible:inset-ring focus-visible:inset-ring-blue-500 ',
      },
      size: {
        default: 'h-6 px-2 has-[>svg]:px-3',
        large: 'h-8 px-3 has-[>svg]:px-4',
        icon: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,

  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {}) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
