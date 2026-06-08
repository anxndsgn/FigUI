import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@/lib/utils";

export function Separator({ className, ...props }: BaseSeparator.Props) {
  return (
    <BaseSeparator
      className={cn(
        "bg-grey-200 data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px dark:bg-grey-600",
        className,
      )}
      {...props}
    />
  );
}
