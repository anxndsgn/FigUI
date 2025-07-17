import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-medium typography-body-medium disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:border-[1.5px] focus-visible:border-blue-500 outline-offset-0 outline-transparent",
  {
    variants: {
      variant: {
        primary:
          'bg-blue-500 text-white-1000 active:bg-blue-600 active:outline dark:active:outline-blue-500 active:-outline-offset-1 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-grey-500 ',
        secondary:
          'text-black-800 border border-grey-200 active:bg-grey-100 active:border-grey-300 disabled:border-grey-300 disabled:text-grey-500 dark:text-white-1000 dark:border-grey-600 dark:active:bg-grey-600 dark:active:border-grey-700 dark:disabled:border-grey-700 dark:disabled:text-grey-400',
        destructive:
          'bg-red-500 text-white-1000 active:bg-red-600 active:outline dark:active:outline-red-500 active:-outline-offset-1 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-grey-500',
        secondaryDestruct:
          'border border-red-500 text-red-500 active:bg-red-100 active:border-red-600 disabled:border-red-600 disabled:text-red-400',
        inverse:
          'bg-white-1000 text-black-800 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-grey-500',
        success:
          'bg-green-500 text-white-1000 active:bg-green-600 active:outline dark:active:outline-green-500 active:-outline-offset-1 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-grey-500',
        link: 'text-blue-600 active:bg-blue-100 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:text-grey-500',
        linkDanger:
          'text-red-500 active:bg-red-100 disabled:text-red-400 focus-visible:border-red-500',
        ghost:
          'hover:bg-grey-100 active:bg-grey-200 disabled:text-grey-500 focus-visible:border-grey-200 focus-visible:border-[1.5px]',
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
