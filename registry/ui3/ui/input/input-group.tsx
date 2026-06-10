"use client";

import type * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@/lib/utils";

const INPUT_GROUP_CLASS = [
  "bg-grey-100 dark:bg-grey-700 inline-flex h-6 items-center rounded-md",
  "ring ring-transparent hover:ring-grey-200 dark:hover:ring-grey-600",
  "focus-within:ring-blue-500! dark:focus-within:ring-blue-500!",
  "has-data-scrubbing:ring-blue-600! dark:has-data-scrubbing:ring-blue-400!",
  "has-[[aria-invalid=true]]:ring-red-500/20! dark:has-[[aria-invalid=true]]:ring-red-500/30!",
  "[&>input[aria-hidden=true]]:!hidden",
  "[&>[data-slot=input]+[data-slot=divider]]:ml-1",
  "[&>[data-slot=section]:has(>[data-slot=input]:last-child)+[data-slot=divider]]:ml-1",
  "[&>[data-slot=section]:has(>[data-slot=input]:last-child)+input[aria-hidden=true]+[data-slot=divider]]:ml-1",
  "[&>[data-slot=divider]+[data-slot=input]]:ml-1",
  "[&>[data-slot=divider]+[data-slot=section]:has(>[data-slot=input]:first-child)]:ml-1",
  "[&_[data-slot=input]]:h-full",
  "[&_[data-slot=input]]:rounded-none!",
  "[&_[data-slot=input]]:bg-transparent!",
  "[&_[data-slot=input]]:px-0!",
  "[&_[data-slot=input]]:ring-0!",
  "[&_[data-slot=input]]:ring-transparent!",
  "[&_[data-slot=input]]:hover:ring-transparent!",
  "[&_[data-slot=input]]:focus:ring-transparent!",
  "dark:[&_[data-slot=input]]:bg-transparent!",
  "[&_[data-slot=inline-select]]:h-full",
  "[&_[data-slot=inline-select]]:border-0!",
  "[&_[data-slot=inline-select]]:bg-transparent!",
  "[&_[data-slot=inline-select]]:focus-visible:border-transparent!",
  "[&>[data-slot=addon]:has([data-slot=addon-select])]:p-0",
  "[&_[data-slot=addon-select]]:h-full",
  "[&_[data-slot=addon-select]]:border-0!",
  "[&_[data-slot=addon-select]]:bg-transparent!",
  "[&_[data-slot=addon-select]]:focus-visible:border-transparent!",
  "[&>[data-slot=section]]:h-full",
  "[&>[data-slot=section]]:rounded-none!",
  "[&>[data-slot=section]]:ring-transparent!",
  "[&>[data-slot=section]]:hover:ring-transparent!",
  "[&>[data-slot=input]:first-child]:pl-1.5!",
  "[&>[data-slot=input]:last-child]:pr-1.5!",
  "[&>[data-slot=section]:first-child>[data-slot=input]:first-child]:pl-1.5!",
  "[&>[data-slot=section]>[data-slot=input]:last-child]:pr-1.5!",
].join(" ");

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <div className={cn(INPUT_GROUP_CLASS, className)} {...props}>
      {children}
    </div>
  );
}

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function InputGroupAddon({ className, children, ...props }: InputGroupAddonProps) {
  return (
    <div
      data-slot="addon"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center text-xs text-grey-500",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface InputGroupButtonProps extends BaseButton.Props {}

function InputGroupButton({ className, type = "button", ...props }: InputGroupButtonProps) {
  return (
    <BaseButton
      {...props}
      data-slot="input-group-button"
      type={type}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-sm border-0! text-black-800 outline-none",
        "focus-visible:inset-ring focus-visible:inset-ring-blue-500",
        "disabled:pointer-events-none disabled:opacity-50",
        "dark:text-white-800 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
        className,
      )}
    />
  );
}

interface InputGroupDividerProps {
  className?: string;
}

function InputGroupDivider({ className }: InputGroupDividerProps) {
  return (
    <div
      data-slot="divider"
      aria-hidden="true"
      className={cn("h-6 w-px shrink-0 self-center bg-grey-200 dark:bg-grey-600", className)}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupDivider };
