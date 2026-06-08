"use client";

import { NumericInputRoot, NumericScrubArea, NumericInput } from "@/registry/ui3/ui/input";

export default function NumericInputDemo() {
  return (
    <div className="flex flex-col gap-2">
      <NumericInputRoot defaultValue={12} min={0} max={100} className="w-32">
        <NumericInput />
      </NumericInputRoot>
      <NumericInputRoot defaultValue={12} min={0} max={100} className="w-32">
        <NumericScrubArea className="flex size-6 shrink-0 items-center justify-center text-black-500 dark:text-white-500">
          X
        </NumericScrubArea>
        <NumericInput />
      </NumericInputRoot>
    </div>
  );
}
