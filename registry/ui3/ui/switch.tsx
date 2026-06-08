import { cn } from "@/lib/utils";
import { Switch as BaseSwitch } from "@base-ui/react";

export function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      {...props}
      className={cn(
        "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full p-[1px] transition-colors duration-200 ease-in-out outline-none focus-visible:ring focus-visible:inset-ring-2 focus-visible:ring-blue-500 focus-visible:inset-ring-white-1000 data-checked:bg-blue-500 data-disabled:bg-grey-300 data-unchecked:bg-grey-200 dark:focus-visible:ring-blue-400 dark:data-disabled:bg-grey-500 dark:data-unchecked:bg-grey-600",
        className,
      )}
    >
      <BaseSwitch.Thumb className="size-3.5 rounded-full bg-white-1000 transition-transform duration-150 data-checked:translate-x-4 data-disabled:bg-white-1000 dark:data-disabled:bg-grey-800" />
    </BaseSwitch.Root>
  );
}
