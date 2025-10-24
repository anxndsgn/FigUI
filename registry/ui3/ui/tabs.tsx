import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return (
    <BaseTabs.Root
      {...props}
      className={cn('overflow-hidden outline-none', className)}
    />
  );
}

function TabsList({ className, ...props }: BaseTabs.List.Props) {
  return (
    <div
      className={cn(
        'relative',
        'before:from-white-1000 dark:before:from-grey-800 before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-2 before:bg-gradient-to-r before:to-transparent before:content-[""]',
        'after:from-white-1000 dark:after:from-grey-800 after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-2 after:bg-gradient-to-l after:to-transparent after:content-[""]',
      )}
    >
      <BaseTabs.List
        {...props}
        className={cn(
          'no-scrollbar flex gap-1 overflow-x-auto outline-none',
          className,
        )}
      >
        {props.children}
      </BaseTabs.List>
    </div>
  );
}

function Tab({ className, ...props }: BaseTabs.Tab.Props) {
  return (
    <BaseTabs.Tab
      {...props}
      className={cn(
        'typography-body-medium text-black-500 data-selected:text-black-1000 dark:data-selected:text-white-1000 dark:text-white-500 data-selected:bg-grey-100 dark:data-selected:bg-grey-700 hover:bg-grey-100 dark:hover:bg-grey-700 h-6 shrink-0 rounded-md px-2 outline-none focus-visible:inset-ring focus-visible:inset-ring-blue-500 data-selected:font-[500]',
        className,
      )}
    />
  );
}

function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return (
    <BaseTabs.Panel {...props} className={cn('outline-none', className)} />
  );
}

export { Tabs, TabsList, Tab, TabsPanel };
