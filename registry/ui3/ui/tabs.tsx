import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return <BaseTabs.Root {...props} className={cn("overflow-hidden outline-none", className)} />;
}

function TabsList({ className, ...props }: BaseTabs.List.Props) {
  return (
    <div
      className={cn(
        "relative",
        'before:pointer-events-none before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-2 before:bg-gradient-to-r before:from-white-1000 before:to-transparent before:content-[""] dark:before:from-grey-800',
        'after:pointer-events-none after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-2 after:bg-gradient-to-l after:from-white-1000 after:to-transparent after:content-[""] dark:after:from-grey-800',
      )}
    >
      <BaseTabs.List
        {...props}
        className={cn("no-scrollbar flex gap-1 overflow-x-auto outline-none", className)}
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
        "typography-body-medium h-6 shrink-0 rounded-md px-2 text-black-500 outline-none hover:bg-grey-100 focus-visible:inset-ring focus-visible:inset-ring-blue-500 data-active:bg-grey-100 data-active:font-[500] data-active:text-black-1000 dark:text-white-500 dark:hover:bg-grey-700 dark:data-active:bg-grey-700 dark:data-active:text-white-1000",
        className,
      )}
    />
  );
}

function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return <BaseTabs.Panel {...props} className={cn("outline-none", className)} />;
}

export { Tabs, TabsList, Tab, TabsPanel };
