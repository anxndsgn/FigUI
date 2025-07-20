import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) {
  return <BaseTabs.Root {...props} className={cn('outline-none', className)} />;
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      {...props}
      className={cn('flex gap-1 outline-none', className)}
    />
  );
}

function Tab({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      {...props}
      className={cn(
        'typography-body-medium text-black-500 data-[selected]:text-black-1000 dark:data-[selected]:text-white-1000 dark:text-white-500 data-[selected]:typography-body-medium-strong data-[selected]:bg-grey-100 dark:data-[selected]:bg-grey-700 hover:bg-grey-100 dark:hover:bg-grey-700 dark:focus-visible:ring-white-1000 h-6 rounded-md px-2 outline-none focus-visible:ring focus-visible:ring-blue-500',
        className,
      )}
    />
  );
}

function TabsPanel({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel {...props} className={cn('outline-none', className)} />
  );
}

export { Tabs, TabsList, Tab, TabsPanel };
