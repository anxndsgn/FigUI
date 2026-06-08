import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRender, mergeProps } from "@base-ui/react";

const solidFocusRing =
  "focus-visible:inset-ring-2 focus-visible:inset-ring-white-1000 focus-visible:border-blue-500";

const buttonVariants = cva(
  "typography-body-medium inline-flex shrink-0 items-center justify-center gap-1 rounded-md whitespace-nowrap outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: cn(
          "bg-blue-500 text-white-1000 active:bg-blue-600 disabled:bg-grey-500 dark:border dark:border-transparent dark:active:border-blue-500",
          solidFocusRing,
        ),
        secondary:
          "border border-grey-200 text-black-800 focus-visible:border-none focus-visible:inset-ring focus-visible:inset-ring-blue-500 active:border-grey-300 active:bg-grey-100 disabled:border-grey-300 disabled:text-grey-500 dark:border-grey-600 dark:text-white-1000 dark:active:border-grey-600 dark:active:bg-grey-700 dark:disabled:border-grey-700 dark:disabled:text-grey-400",
        destructive: cn(
          "bg-red-500 text-white-1000 active:bg-red-600 active:outline active:-outline-offset-1 disabled:bg-grey-500 dark:active:outline-red-500",
          solidFocusRing,
        ),
        secondaryDestruct:
          "border border-red-300 text-red-500 focus-visible:border-none focus-visible:inset-ring focus-visible:inset-ring-blue-500 active:bg-grey-100 disabled:border-red-600 disabled:text-red-400 dark:border-red-700 dark:text-red-300 dark:active:border-red-600 dark:active:bg-grey-700",
        inverse: cn(
          "bg-black-1000 text-white-1000 disabled:bg-grey-500 dark:bg-white-1000 dark:text-black-1000",
          solidFocusRing,
        ),
        success: cn(
          "bg-green-500 text-white-1000 active:bg-green-600 active:outline active:-outline-offset-1 disabled:bg-grey-500 dark:active:outline-green-500",
          solidFocusRing,
        ),
        link: "text-blue-600 focus-visible:inset-ring focus-visible:inset-ring-blue-500 active:bg-blue-200 disabled:text-grey-500 dark:text-blue-400 dark:active:bg-pale-blue-800",
        linkDanger:
          "text-red-600 focus-visible:inset-ring focus-visible:inset-ring-red-300 active:bg-red-200 disabled:text-red-400 dark:text-red-400 dark:focus-visible:inset-ring-red-700 dark:active:bg-pale-red-800",
        ghost:
          "border-none hover:bg-black-200 focus-visible:inset-ring focus-visible:inset-ring-blue-500 active:bg-black-1000/15 disabled:text-grey-500",
      },
      size: {
        default: "h-6 px-2 has-[>svg]:px-3",
        large: "h-8 px-3 has-[>svg]:px-4",
        icon: "size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

interface ButtonProps
  extends useRender.ComponentProps<"button">, VariantProps<typeof buttonVariants> {}

function Button({ variant, size, render, className, ...props }: ButtonProps) {
  const buttonElement = useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(props, {
      className: cn(buttonVariants({ variant, size, className })),
    }),
  });
  return buttonElement;
}

export { Button, buttonVariants };
