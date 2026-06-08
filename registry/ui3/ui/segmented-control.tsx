import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";

function SegmentedControl({ className, ...props }: RadioGroup.Props) {
  return (
    <RadioGroup
      className={cn("flex w-fit rounded-md bg-grey-100 dark:bg-grey-700", className)}
      {...props}
    >
      {props.children}
    </RadioGroup>
  );
}

function SegmentedControlItem({ className, children, ...props }: Radio.Root.Props) {
  return (
    <Radio.Root
      className={cn(
        "typography-body-medium flex h-6 cursor-default items-center justify-center rounded-md px-2 text-center text-black-500 outline-none select-none focus-visible:inset-ring focus-visible:inset-ring-blue-500 data-checked:border-grey-200 data-checked:bg-white-1000 data-checked:text-black-1000 data-checked:inset-ring data-checked:inset-ring-grey-200 focus-visible:data-checked:inset-ring-blue-500 data-disabled:text-black-400 dark:text-white-500 dark:data-checked:bg-grey-800 dark:data-checked:text-white-1000 dark:data-checked:inset-ring-grey-600 dark:data-disabled:text-white-400",
        className,
      )}
      {...props}
    >
      {children}
    </Radio.Root>
  );
}

export { SegmentedControl, SegmentedControlItem };
