import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-(--figma-spacer-1) whitespace-nowrap rounded-(--figma-radius-medium) figma-typography-body-medium disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:border-(--figma-color-border-selected) focus-visible:border-[1.5px] outline-offset-0 outline-transparent",
  {
    variants: {
      variant: {
        primary:
          'bg-(--figma-color-bg-brand) text-(--figma-color-text-onbrand) active:bg-(--figma-color-bg-brand-pressed) active:outline active:outline-(--figma-color-border-selected-strong) active:outline-offset-0 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figma-color-bg-disabled)',
        secondary:
          'text-(--figma-color-text) border border-(--figma-color-border) hover:bg-(--figma-color-bg-secondary-hover) hover:border-(--figma-color-bordertranslucent) disabled:border-(--figma-color-border-disabled) disabled:text-(--figma-color-text-disabled)',
        destructive:
          'bg-(--figma-color-bg-danger) text-(--figma-color-text-ondanger) hover:bg-(--figma-color-bg-danger-hover) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figma-color-bg-disabled)',
        secondaryDestruct:
          'border border-(--figma-color-border-danger) text-(--figma-color-text-danger) disabled:border-(--figma-color-border-disabled) disabled:text-(--figma-color-text-disabled)',
        inverse:
          'bg-(--figma-color-bg-inverse) text-(--figma-color-text-oninverse) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figma-color-bg-disabled)',
        success:
          'bg-(--figma-color-bg-success) hover:bg-(--figma-color-bg-success-hover) text-(--figma-color-text-onsuccess) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figma-color-bg-disabled)',
        link: 'text-(--figma-color-text-brand) hover:bg-(--figma-color-bg-brand-tertiary) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:text-(--figma-color-text-disabled)',
        linkDanger:
          'text-(--figma-color-text-danger) hover:bg-(--figma-color-bg-danger-tertiary) disabled:text-(--figma-color-text-disabled) focus-visible:border-(--figma-color-border-danger)',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 disabled:bg-(--figma-color-bg-disabled)',
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
