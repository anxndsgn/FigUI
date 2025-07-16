import * as React from 'react';
import { Input } from '@base-ui-components/react';
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
      variant: {
        singleline: 'flex-row items-center',
        multiline:
          'py-(--spacer-1) min-h-6 max-w-64 resize-none [field-sizing:content]',
      },
      size: {
        default: 'h-6',
        large: 'h-8',
      },
      withIcon: {
        true: 'pl-10',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'multiline',
        size: ['default', 'large'],
        class: 'h-auto', // Override height for multiline
      },
    ],
    defaultVariants: {
      variant: 'singleline',
      size: 'default',
      withIcon: false,
    },
  }
);

interface BaseTextInputProps extends VariantProps<typeof inputVariants> {
  Icon?: React.ComponentType<{ className?: string }>;
}

type SinglelineProps = BaseTextInputProps &
  Omit<React.ComponentProps<'input'>, 'size'> & {
    variant?: 'singleline';
  };

type MultilineProps = BaseTextInputProps &
  Omit<React.ComponentProps<'textarea'>, 'size'> & {
    variant: 'multiline';
    Icon?: never; // Multiline doesn't support icons
  };

type TextInputProps = SinglelineProps | MultilineProps;

function TextInput({
  className,
  variant = 'singleline',
  size,
  Icon,
  ref,
  ...props
}: TextInputProps) {
  const baseClassName = inputVariants({
    variant,
    size,
    withIcon: !!Icon,
    className,
  });

  if (variant === 'multiline') {
    return (
      <textarea
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={cn(baseClassName, className)}
        {...(props as React.ComponentProps<'textarea'>)}
      />
    );
  }

  // Singleline variant
  if (Icon) {
    return (
      <div className='relative'>
        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-(--color-text-tertiary) pointer-events-none' />
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          className={cn(baseClassName, className)}
          {...(props as React.ComponentProps<'input'>)}
        />
      </div>
    );
  }

  return (
    <Input
      ref={ref as React.Ref<HTMLInputElement>}
      className={cn(baseClassName, className)}
      {...(props as React.ComponentProps<'input'>)}
    />
  );
}

TextInput.displayName = 'TextInput';

export { TextInput, inputVariants };
