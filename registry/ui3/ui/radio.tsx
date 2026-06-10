import { RadioGroup, Radio as BaseRadio } from "@base-ui/react";
import { cn } from "@/lib/utils";

function Radio({ className, ...props }: BaseRadio.Root.Props) {
  return (
    <BaseRadio.Root
      className={cn(
        "grid size-4 shrink-0 place-content-center rounded-full bg-grey-200 inset-ring inset-ring-black-300 transition-colors duration-100 ease-in-out outline-none hover:bg-grey-300 focus-visible:border-blue-500 data-checked:bg-blue-500 data-disabled:border-grey-300 data-disabled:bg-grey-100 dark:bg-grey-700 dark:inset-ring-white-300 dark:hover:bg-grey-600 dark:focus-visible:border-blue-400 dark:data-disabled:border-grey-600 dark:data-disabled:bg-grey-700",
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="size-2 rounded-full bg-white-1000 ring ring-black-300 transition-transform duration-100 data-starting-style:scale-70" />
    </BaseRadio.Root>
  );
}

export { Radio, RadioGroup };
