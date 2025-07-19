import { Select as BaseSelect } from '@base-ui-components/react';
import { CheckIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as React from 'react';

function SelectRoot({
  ...props
}: React.ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  size,
  iconLeading,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger> & {
  iconLeading?: React.ReactNode;
  size?: 'default' | 'large';
}) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'flex border border-grey-300 rounded-md items-center justify-between cursor-default outline-none focus-visible:border-blue-500',
        'dark:border-grey-700 dark:focus-visible:border-blue-500',
        iconLeading ? '' : 'pl-2',
        size === 'large' ? 'h-8' : 'h-6',
        className
      )}
      {...props}
    >
      {iconLeading && (
        <span className='aspect-square h-full flex items-center justify-center [&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:text-black-500 dark:[&_svg]:text-white-500'>
          {iconLeading}
        </span>
      )}
      {children}
      <BaseSelect.Icon className='size-6 flex items-center justify-center [&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:text-black-800 dark:[&_svg]:text-white-800'>
        <ChevronDown />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Positioner>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={cn(
          'bg-grey-900 rounded-lg shadow-400 dark:inset-shadow-2xs dark:inset-shadow-white-100 overflow-hidden',
          className
        )}
        {...props}
      >
        <SelectScrollUpArrow />
        <BaseSelect.Popup className={'group max-h-(--available-height)] p-2'}>
          {children}
        </BaseSelect.Popup>
        <SelectScrollDownArrow />
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Value>) {
  return (
    <BaseSelect.Value
      className={cn(
        'typography-body-medium flex-1 truncate dark:text-white-1000 text-black-1000',
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        'typography-body-medium grid grid-cols-[0.75rem_1fr] gap-2 text-white-1000 cursor-default px-2 py-1 rounded-md min-w-(--anchor-width) data-[highlighted]:bg-blue-500',
        className
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator className='col-start-1 flex items-center justify-center'>
        <CheckIcon className='size-3' />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className='col-start-2'>
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectItemText({
  ...props
}: React.ComponentProps<typeof BaseSelect.ItemText>) {
  return <BaseSelect.ItemText {...props} />;
}

function SelectItemIndicator({
  ...props
}: React.ComponentProps<typeof BaseSelect.ItemIndicator>) {
  return <BaseSelect.ItemIndicator {...props} />;
}

function SelectSeparator({
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) {
  return <BaseSelect.Separator {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof BaseSelect.Group>) {
  return <BaseSelect.Group {...props} />;
}

function SelectGroupLabel({
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) {
  return <BaseSelect.GroupLabel {...props} />;
}

function SelectScrollUpArrow({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow
      {...props}
      className={cn(
        'flex z-10 h-4 w-full cursor-default items-center justify-center rounded-lg bg-grey-900 py-1',
        className
      )}
    >
      <ChevronUp className='size-3' />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow
      {...props}
      className={cn(
        'flex z-10 h-4 w-full cursor-default items-center justify-center rounded-lg bg-grey-900 py-1',
        className
      )}
    >
      <ChevronDown className='size-3' />
    </BaseSelect.ScrollDownArrow>
  );
}

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectScrollUpArrow,
  SelectScrollDownArrow,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectSeparator,
  SelectGroup,
  SelectGroupLabel,
  SelectContent,
};
