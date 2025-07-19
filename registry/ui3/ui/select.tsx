import { Select as BaseSelect } from '@base-ui-components/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

function SelectRoot({
  ...props
}: React.ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'flex border border-grey-300 rounded-md pl-2 h-6 items-center justify-between cursor-default outline-none focus-visible:border-blue-500',
        'dark:border-grey-700 dark:focus-visible:border-blue-500',
        className
      )}
      {...props}
    >
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
          'bg-black-1000 rounded-md min-w-(--anchor-width)',
          className
        )}
        {...props}
      >
        <SelectScrollUpArrow />
        <BaseSelect.Popup
          className={
            'group max-h-(--available-height) origin-(--transform-origin)'
          }
        >
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
      className={cn('typography-body-medium', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={cn(
        'typography-body-medium text-white-1000 cursor-default',
        className
      )}
      {...props}
    />
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
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollUpArrow>) {
  return (
    <BaseSelect.ScrollUpArrow {...props}>
      <ChevronUp />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow {...props}>
      <ChevronDown />
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
