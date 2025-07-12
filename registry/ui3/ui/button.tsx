import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-(--spacer-1) whitespace-nowrap rounded-(--radius-medium) figma-typography-body-medium disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:border-(--color-border-selected) focus-visible:border-[1.5px] outline-offset-0 outline-transparent",
  {
    variants: {
      variant: {
        primary:
          'bg-(--color-bg-brand) text-(--color-text-onbrand) active:bg-(--color-bg-brand-pressed) active:outline active:outline-(--color-border-selected-strong) active:-outline-offset-1 focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--color-bg-disabled)',
        secondary:
          'text-(--color-text) border border-(--color-border) hover:bg-(--color-bg-secondary-hover) hover:border-(--color-bordertranslucent) disabled:border-(--color-border-disabled) disabled:text-(--color-text-disabled)',
        destructive:
          'bg-(--color-bg-danger) text-(--color-text-ondanger) hover:bg-(--color-bg-danger-hover) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--color-bg-disabled)',
        secondaryDestruct:
          'border border-(--color-border-danger) text-(--color-text-danger) disabled:border-(--color-border-disabled) disabled:text-(--color-text-disabled)',
        inverse:
          'bg-(--color-bg-inverse) text-(--color-text-oninverse) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--color-bg-disabled)',
        success:
          'bg-(--color-bg-success) hover:bg-(--color-bg-success-hover) text-(--color-text-onsuccess) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:bg-(--color-bg-disabled)',
        link: 'text-(--color-text-brand) hover:bg-(--color-bg-brand-tertiary) focus-visible:inset-ring-[2px] focus-visible:inset-ring-white disabled:text-(--color-text-disabled)',
        linkDanger:
          'text-(--color-text-danger) hover:bg-(--color-bg-danger-tertiary) disabled:text-(--color-text-disabled) focus-visible:border-(--color-border-danger)',
        ghost:
          'hover:bg-(--color-bg-transparent-hover) active:bg-(--color-bg-transparent-pressed) disabled:text-(--color-text-disabled) focus-visible:border-(--color-border-selected) focus-visible:border-[1.5px]',
      },
      size: {
        default: 'h-6 px-(--spacer-2) has-[>svg]:px-3',
        large: 'h-8 px-(--spacer-2-5) has-[>svg]:px-4',
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
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
