import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-(--figui-spacer-1) whitespace-nowrap rounded-(--figui-radius-medium) figma-typography-body-medium disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:border-(--figui-color-border-selected) focus-visible:border-[1.5px] outline-offset-0 outline-transparent",
  {
    variants: {
      variant: {
        primary:
          'bg-(--figui-color-bg-brand) text-(--figui-color-text-onbrand) active:bg-(--figui-color-bg-brand-pressed) active:outline active:outline-(--figui-color-border-selected-strong) active:-outline-offset-1 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figui-color-bg-disabled)',
        secondary:
          'text-(--figui-color-text) border border-(--figui-color-border) hover:bg-(--figui-color-bg-secondary-hover) hover:border-(--figui-color-bordertranslucent) disabled:border-(--figui-color-border-disabled) disabled:text-(--figui-color-text-disabled)',
        destructive:
          'bg-(--figui-color-bg-danger) text-(--figui-color-text-ondanger) hover:bg-(--figui-color-bg-danger-hover) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figui-color-bg-disabled)',
        secondaryDestruct:
          'border border-(--figui-color-border-danger) text-(--figui-color-text-danger) disabled:border-(--figui-color-border-disabled) disabled:text-(--figui-color-text-disabled)',
        inverse:
          'bg-(--figui-color-bg-inverse) text-(--figui-color-text-oninverse) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figui-color-bg-disabled)',
        success:
          'bg-(--figui-color-bg-success) hover:bg-(--figui-color-bg-success-hover) text-(--figui-color-text-onsuccess) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--figui-color-bg-disabled)',
        link: 'text-(--figui-color-text-brand) hover:bg-(--figui-color-bg-brand-tertiary) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:text-(--figui-color-text-disabled)',
        linkDanger:
          'text-(--figui-color-text-danger) hover:bg-(--figui-color-bg-danger-tertiary) disabled:text-(--figui-color-text-disabled) focus-visible:border-(--figui-color-border-danger)',
        ghost:
          'hover:bg-(--figui-color-bg-transparent-hover) active:bg-(--figui-color-bg-transparent-pressed) disabled:text-(--figui-color-text-disabled) focus-visible:border-(--figui-color-border-selected) focus-visible:border-[1.5px]',
      },
      size: {
        default: 'h-6 px-(--figui-spacer-2) has-[>svg]:px-3',
        large: 'h-8 px-(--figui-spacer-2-5) has-[>svg]:px-4',
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
