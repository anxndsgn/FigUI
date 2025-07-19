import { Select as BaseSelect } from '@base-ui-components/react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function SelectRoot({
  ...props
}: React.ComponentProps<typeof BaseSelect.Root>) {
  return <BaseSelect.Root {...props} />;
}

function SelectTrigger({
  className,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={cn('select-trigger', className)}
      {...props}
    />
  );
}

function SelectContent({
  children,
  ...props
}: React.ComponentProps<typeof BaseSelect.Positioner>) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner {...props}>
        <SelectScrollUpArrow />
        <BaseSelect.Popup>{children}</BaseSelect.Popup>
        <SelectScrollDownArrow />
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value {...props} />;
}

function SelectItem({
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
  return <BaseSelect.Item {...props} />;
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
      <ArrowUp />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({
  ...props
}: React.ComponentProps<typeof BaseSelect.ScrollDownArrow>) {
  return (
    <BaseSelect.ScrollDownArrow {...props}>
      <ArrowDown />
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
