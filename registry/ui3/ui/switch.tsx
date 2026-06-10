import { cn } from "@/lib/utils";
import { Switch as BaseSwitch } from "@base-ui/react";

type SwitchProps = BaseSwitch.Root.Props & {
  indeterminate?: boolean;
};

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      {...props}
      className={cn(
        "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full p-px inset-ring inset-ring-black-300 transition-colors duration-200 ease-in-out outline-none focus-visible:ring focus-visible:inset-ring-2 focus-visible:ring-blue-500 focus-visible:inset-ring-white-1000 data-checked:bg-blue-500 data-disabled:bg-grey-300 data-indeterminate:bg-blue-500 data-unchecked:bg-grey-200 data-unchecked:hover:bg-grey-300 dark:inset-ring-white-300 dark:focus-visible:ring-blue-400 dark:data-disabled:bg-grey-500 dark:data-indeterminate:bg-blue-500 dark:data-unchecked:bg-grey-700 dark:data-unchecked:hover:bg-grey-600",
        className,
      )}
    >
      <BaseSwitch.Thumb className="h-2 w-3 rounded-full bg-white-1000 ring ring-black-300 transition-transform duration-150 data-checked:translate-x-3.5 data-disabled:bg-white-1000 data-indeterminate:h-1 data-indeterminate:translate-x-2.5 data-unchecked:translate-x-1 dark:data-disabled:bg-grey-800" />
    </BaseSwitch.Root>
  );
}
