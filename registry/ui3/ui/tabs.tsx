import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Root>) {
  return (
    <BaseTabs.Root
      {...props}
      className={cn(
        'dark:bg-grey-800 border-grey-200 dark:border-grey-700 rounded-lg border bg-white shadow-sm',
        className,
      )}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      {...props}
      className={cn(
        'dark:bg-grey-800 flex items-center justify-between rounded-t-lg border-b bg-white p-1',
        className,
      )}
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
        'data-[state=inactive]:text-grey-600 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=active]:bg-blue-500 data-[state=active]:text-white',
        className,
      )}
    />
  );
}

function TabsPanel({
  className,
  ...props
}: React.ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel {...props} className={cn('p-4', className)} />;
}

export { Tabs, TabsList, Tab, TabsPanel };
