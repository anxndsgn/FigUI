import { Checkbox as BaseCheckbox, CheckboxGroup } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { CheckIcon, MinusIcon } from "lucide-react";

function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "grid size-4 shrink-0 place-content-center rounded-sm border border-grey-200 bg-grey-100 outline-none focus-visible:border-blue-500 disabled:cursor-not-allowed data-checked:border-blue-600 data-checked:bg-blue-500 data-checked:text-white-1000 data-checked:focus-visible:inset-ring data-checked:focus-visible:inset-ring-white-1000 data-disabled:border-none data-disabled:bg-grey-300 data-indeterminate:border-blue-600 data-indeterminate:bg-blue-500 data-indeterminate:text-white-1000 dark:border-grey-600 dark:bg-grey-700 dark:focus-visible:border-blue-400 dark:data-checked:border-blue-400 dark:data-checked:bg-blue-500 dark:data-disabled:bg-grey-500 dark:data-indeterminate:border-blue-400 dark:data-indeterminate:bg-blue-500",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator
        className="relative block size-2.5 text-current transition-none data-disabled:text-white-1000 dark:data-disabled:text-grey-800"
        render={(props, state) =>
          state.indeterminate ? (
            <span {...props}>
              <MinusIcon
                aria-hidden="true"
                className="absolute inset-0 size-full text-blue-600"
                strokeWidth={8}
              />
              <MinusIcon
                aria-hidden="true"
                className="absolute inset-0 size-full"
                strokeWidth={3}
              />
            </span>
          ) : (
            <span {...props}>
              <CheckIcon
                aria-hidden="true"
                className="absolute inset-0 size-full text-blue-600"
                strokeWidth={8}
              />
              <CheckIcon
                aria-hidden="true"
                className="absolute inset-0 size-full"
                strokeWidth={3}
              />
            </span>
          )
        }
      ></BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

export { Checkbox, CheckboxGroup };
