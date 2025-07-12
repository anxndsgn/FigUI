import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-(--figma-spacer-1) whitespace-nowrap rounded-(--figma-radius-medium) figma-typography-body-medium disabled:pointer-events-none disabled:bg-(--figma-color-bg-disabled) [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          'bg-(--figma-color-bg-brand) text-(--figma-color-text-onbrand) hover:bg-(--figma-color-bg-brand-hover)',
        secondary:
          'text-(--figma-color-text-onsecondary) border border-(--figma-color-border) hover:bg-(--figma-color-bg-secondary-hover) hover:border-(--figma-color-bordertranslucent)',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        secondaryDestruct:
          'bg-(--figma-color-bg-danger) text-(--figma-color-text-ondanger) hover:bg-(--figma-color-bg-danger-hover)',
        inverse:
          'bg-(--figma-color-bg-brand) text-(--figma-color-text-onbrand) hover:bg-(--figma-color-bg-brand-hover)',
        success:
          'bg-(--figma-color-bg-success) text-(--figma-color-text-onsuccess) hover:bg-(--figma-color-bg-success-hover)',
        link: 'text-primary underline-offset-4 hover:underline',
        linkDanger:
          'text-(--figma-color-text-danger) hover:text-(--figma-color-text-danger-hover)',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      },
      size: {
        default:
          'h-6 px-(--figma-spacer-2) py-(--figma-spacer-1) has-[>svg]:px-3',
        large: 'h-8 px-(--figma-spacer-2-5) has-[>svg]:px-4',
        icon: 'size-9',
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
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
