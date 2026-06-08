import { cn } from "@/lib/utils";
import { Menu as BaseMenu } from "@base-ui/react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import * as React from "react";

const Menu = BaseMenu.Root;

const MenuTrigger = BaseMenu.Trigger;

const MenuPortal = BaseMenu.Portal;

const MenuGroup = BaseMenu.Group;

const MenuRadioGroup = BaseMenu.RadioGroup;

const MenuSub = BaseMenu.SubmenuRoot;

function MenuContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: BaseMenu.Positioner.Props) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className={cn(
          "overflow-hidden rounded-lg bg-grey-900 shadow-400 dark:inset-shadow-2xs dark:inset-shadow-white-100",
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      >
        <BaseMenu.Popup className="min-w-(--anchor-width) p-2">{children}</BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function MenuSubContent({
  className,
  sideOffset = 12,
  children,
  ...props
}: BaseMenu.Positioner.Props) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className={cn(
          "overflow-hidden rounded-lg bg-grey-900 shadow-400 dark:inset-shadow-2xs dark:inset-shadow-white-100",
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      >
        <BaseMenu.Popup className="min-w-(--anchor-width) p-2">{children}</BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

function MenuItem({
  className,
  inset,
  ...props
}: BaseMenu.Item.Props & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.Item
      className={cn(
        "typography-body-medium flex cursor-default items-center gap-2 rounded-md px-2 py-1 text-white-1000 outline-none data-highlighted:bg-blue-500 data-disabled:pointer-events-none data-disabled:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: BaseMenu.CheckboxItem.Props) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(
        "typography-body-medium grid cursor-default grid-cols-[0.75rem_1fr] gap-2 rounded-md px-2 py-1 text-white-1000 outline-none data-highlighted:bg-blue-500 data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="col-start-1 flex items-center justify-center">
        <CheckIcon className="size-3" />
      </BaseMenu.CheckboxItemIndicator>
      <span className="col-start-2">{children}</span>
    </BaseMenu.CheckboxItem>
  );
}

function MenuRadioItem({ className, children, ...props }: BaseMenu.RadioItem.Props) {
  return (
    <BaseMenu.RadioItem
      className={cn(
        "typography-body-medium grid cursor-default grid-cols-[0.75rem_1fr] gap-2 rounded-md px-2 py-1 text-white-1000 outline-none data-highlighted:bg-blue-500 data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="col-start-1 flex items-center justify-center">
        <CircleIcon className="size-2 fill-current" />
      </BaseMenu.RadioItemIndicator>
      <span className="col-start-2">{children}</span>
    </BaseMenu.RadioItem>
  );
}

function MenuLabel({
  className,
  inset,
  ...props
}: BaseMenu.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        "typography-body-medium px-2 py-1 text-white-500",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenuSeparator({ className, ...props }: BaseMenu.Separator.Props) {
  return (
    <BaseMenu.Separator
      className={cn("bg-grey-700 -mx-2 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("typography-body-medium ml-auto text-white-500", className)}
      {...props}
    />
  );
}

function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: BaseMenu.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        "typography-body-medium flex cursor-default items-center gap-2 rounded-md px-2 py-1 text-white-1000 outline-none data-highlighted:bg-blue-500 data-popup-open:bg-blue-500 data-disabled:pointer-events-none data-disabled:opacity-50",
        inset && "pl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-3 text-white-500" />
    </BaseMenu.SubmenuTrigger>
  );
}

export {
  Menu,
  MenuPortal,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
};
