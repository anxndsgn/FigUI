import * as React from 'react';
import { Input } from '@base-ui-components/react';
import { cn } from '@/lib/utils';

function TextInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <Input
      className={cn(
        'file:text-foreground placeholder:text-(--color-text-tertiary) border border-transparent selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-lg bg-(--color-bg-secondary) px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'hover:border-(--color-border)',
        'focus-visible:border-(--color-border-selected)',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { TextInput };
