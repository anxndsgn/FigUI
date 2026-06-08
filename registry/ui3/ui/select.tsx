import { cn } from "@/lib/utils";
import { Select as BaseSelect } from "@base-ui/react";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

const Select = BaseSelect.Root;

function SelectTrigger({
  className,
  children,
  iconLead,
  inline,
  addon,
  ...props
}: BaseSelect.Trigger.Props & {
  iconLead?: React.ReactNode;
  /** Borderless compact trigger for use inside `InputGroup` (e.g. after a divider). */
  inline?: boolean;
  /** Chevron-only trigger for the trailing `InputGroupAddon` slot. */
  addon?: boolean;
}) {
  return (
    <BaseSelect.Trigger
      data-slot={addon ? "addon-select" : inline ? "inline-select" : undefined}
      className={cn(
        "group flex h-6 cursor-default items-center rounded-md outline-none",
        addon
          ? "size-6 shrink-0 justify-center border-0 bg-transparent p-0"
          : inline
            ? "w-auto shrink-0 gap-0.5 border-0 bg-transparent pl-1 pr-1.5"
            : "min-w-0 flex-1 gap-1 border border-grey-300 pl-2 focus-visible:border-blue-500 dark:border-grey-700 dark:focus-visible:border-blue-500",
        "has-data-[figui=select-icon-lead]:pl-0",
        className,
      )}
      {...props}
    >
      {iconLead && (
        <span
          className="flex size-6 shrink-0 items-center justify-center [&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:text-black-500 dark:[&_svg]:text-white-500"
          data-figui="select-icon-lead"
        >
          {typeof iconLead === "string" ? (
            <span className="typography-body-medium text-black-500 dark:text-white-500">
              {iconLead}
            </span>
          ) : (
            iconLead
          )}
        </span>
      )}
      {children}
      <BaseSelect.Icon
        className={cn(
          "flex items-center justify-center [&_svg]:shrink-0 [&_svg]:text-black-800 group-data-disabled:[&_svg]:text-black-400 dark:[&_svg]:text-white-800 dark:group-data-disabled:[&_svg]:text-white-400",
          addon || !inline ? "size-6 [&_svg]:size-3" : "size-4 [&_svg]:size-2.5",
        )}
      >
        <ChevronDown />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

function SelectContent({ className, children, ...props }: BaseSelect.Positioner.Props) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className={cn(
          "overflow-hidden rounded-lg bg-grey-900 shadow-400 dark:inset-shadow-2xs dark:inset-shadow-white-100",
          className,
        )}
        sideOffset={4}
        {...props}
      >
        <SelectScrollUpArrow />
        <BaseSelect.Popup className={"group max-h-(--available-height)] p-2"}>
          <BaseSelect.List>{children}</BaseSelect.List>
        </BaseSelect.Popup>
        <SelectScrollDownArrow />
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectValue({ className, ...props }: BaseSelect.Value.Props) {
  return (
    <BaseSelect.Value
      className={cn(
        "typography-body-medium flex-1 truncate text-black-1000 dark:text-white-1000",
        "text-start group-data-disabled:text-black-400 dark:group-data-disabled:text-white-400",
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item
      className={cn(
        "typography-body-medium grid min-w-(--anchor-width) cursor-default grid-cols-[0.75rem_1fr] gap-2 rounded-md px-2 py-1 text-white-1000 data-highlighted:bg-blue-500",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemIndicator className="col-start-1 flex items-center justify-center">
        <CheckIcon className="size-3" />
      </BaseSelect.ItemIndicator>
      <BaseSelect.ItemText className="col-start-2">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectItemText({ ...props }: BaseSelect.ItemText.Props) {
  return <BaseSelect.ItemText {...props} />;
}

function SelectItemIndicator({ ...props }: BaseSelect.ItemIndicator.Props) {
  return <BaseSelect.ItemIndicator {...props} />;
}

function SelectSeparator({ ...props }: BaseSelect.Separator.Props) {
  return <BaseSelect.Separator {...props} />;
}

function SelectGroup({ ...props }: BaseSelect.Group.Props) {
  return <BaseSelect.Group {...props} />;
}

function SelectGroupLabel({ ...props }: BaseSelect.GroupLabel.Props) {
  return <BaseSelect.GroupLabel {...props} />;
}

function SelectScrollUpArrow({ className, ...props }: BaseSelect.ScrollUpArrow.Props) {
  return (
    <BaseSelect.ScrollUpArrow
      {...props}
      className={cn(
        "z-10 hidden h-4 w-full cursor-default rounded-lg bg-grey-900 py-1 opacity-0 data-[side=none]:flex data-[side=none]:items-center data-[side=none]:justify-center data-[side=none]:py-1 data-[side=none]:opacity-100",
        className,
      )}
    >
      <ChevronUp className="size-3 text-black-1000 dark:text-white-1000" />
    </BaseSelect.ScrollUpArrow>
  );
}

function SelectScrollDownArrow({ className, ...props }: BaseSelect.ScrollDownArrow.Props) {
  return (
    <BaseSelect.ScrollDownArrow
      {...props}
      className={cn(
        "z-10 hidden h-4 w-full cursor-default rounded-lg bg-grey-900 py-1 opacity-0 data-[side=none]:flex data-[side=none]:items-center data-[side=none]:justify-center data-[side=none]:py-1 data-[side=none]:opacity-100",
        className,
      )}
    >
      <ChevronDown className="size-3 text-black-1000 dark:text-white-1000" />
    </BaseSelect.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
