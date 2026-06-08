import { RadioGroup, Radio as BaseRadio } from "@base-ui/react";
import { cn } from "@/lib/utils";

function Radio({ className, ...props }: BaseRadio.Root.Props) {
  return (
    <BaseRadio.Root
      className={cn(
        "size-4 shrink-0 rounded-full border border-black-800 bg-white-1000 outline-none focus-visible:border-blue-500 data-disabled:border-grey-300 data-disabled:bg-grey-100 dark:border-white-1000 dark:bg-grey-800 dark:focus-visible:border-blue-400 dark:data-disabled:border-grey-600 dark:data-disabled:bg-grey-700",
        className,
      )}
      {...props}
    >
      <BaseRadio.Indicator className="flex h-full w-full items-center justify-center">
        <div className="size-2 rounded-full bg-black-800 dark:bg-white-1000" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  );
}

export { Radio, RadioGroup };
