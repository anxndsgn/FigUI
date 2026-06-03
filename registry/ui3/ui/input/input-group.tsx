'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Context ────────────────────────────────────────────────────────────────

interface InputGroupContextValue {
  inGroup: boolean;
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  inGroup: false,
});

function useInputGroup() {
  return React.useContext(InputGroupContext);
}

// ─── Constants ──────────────────────────────────────────────────────────────

/** Classes applied to the InputGroup container (shared shell). */
const INPUT_GROUP_CLASS = [
  // base visual
  'bg-grey-100 dark:bg-grey-700 inline-flex h-6 items-center rounded-md',
  // ring states
  'ring ring-transparent hover:ring-grey-200 dark:hover:ring-grey-600',
  'focus-within:ring-blue-500! dark:focus-within:ring-blue-500!',
  'has-data-scrubbing:ring-blue-600! dark:has-data-scrubbing:ring-blue-400!',
  // Hide phantom inputs rendered by base-ui NumberField.Root
  '[&>input[aria-hidden=true]]:!hidden',
  // ─── Spacing rules via data-slot sibling selectors ───
  // Addons are fixed 24px slots, so their centered contents already create visual gap.
  // Dividers only need added margin when the neighboring visible content is an input.
  '[&>[data-slot=input]+[data-slot=divider]]:ml-1',
  '[&>[data-slot=section]:has(>[data-slot=input]:last-child)+[data-slot=divider]]:ml-1',
  '[&>[data-slot=divider]+[data-slot=input]]:ml-1',
  '[&>[data-slot=divider]+[data-slot=section]:has(>[data-slot=input]:first-child)]:ml-1',
  // First/last child input → padding from container edge
  '[&>[data-slot=input]:first-child]:pl-1.5',
  '[&>[data-slot=input]:last-child]:pr-1.5',
  '[&>[data-slot=section]:first-child>[data-slot=input]:first-child]:pl-1.5',
  '[&>[data-slot=section]:last-child>[data-slot=input]:last-child]:pr-1.5',
].join(' ');

/** Override classes merged into child inputs when inside an InputGroup. */
const GROUPED_INPUT_OVERRIDE =
  'ring-0! ring-transparent! hover:ring-transparent! focus:ring-transparent! rounded-none! bg-transparent! dark:bg-transparent! h-full px-0!';

/** Override classes for NumericInputRoot when it's a child inside an InputGroup. */
const GROUPED_ROOT_OVERRIDE =
  'h-full rounded-none! ring-transparent! hover:ring-transparent!';

// ─── InputGroup ─────────────────────────────────────────────────────────────

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function InputGroup({ className, children, ...props }: InputGroupProps) {
  const ctx = React.useMemo<InputGroupContextValue>(
    () => ({ inGroup: true }),
    [],
  );

  return (
    <InputGroupContext.Provider value={ctx}>
      <div className={cn(INPUT_GROUP_CLASS, className)} {...props}>
        {children}
      </div>
    </InputGroupContext.Provider>
  );
}

// ─── InputGroupAddon ────────────────────────────────────────────────────────

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Fixed-size slot for icons, color chits, scrub-areas, or text labels.
 * Default 24×24 centered flex container.
 */
function InputGroupAddon({
  className,
  children,
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      data-slot='addon'
      className={cn(
        'text-grey-500 flex size-6 shrink-0 items-center justify-center text-xs',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── InputGroupDivider ──────────────────────────────────────────────────────

interface InputGroupDividerProps {
  className?: string;
}

/** Vertical 1px separator between logical sections. */
function InputGroupDivider({ className }: InputGroupDividerProps) {
  return (
    <div
      data-slot='divider'
      aria-hidden='true'
      className={cn(
        'bg-grey-200 dark:bg-grey-600 h-6 w-px shrink-0 self-center',
        className,
      )}
    />
  );
}

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
  useInputGroup,
  GROUPED_INPUT_OVERRIDE,
  GROUPED_ROOT_OVERRIDE,
};
