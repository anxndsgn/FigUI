"use client";

import { Checkbox } from "@/registry/ui3/ui/checkbox";

export default function CheckboxIndeterminateDemo() {
  return (
    <label htmlFor="checkbox-indeterminate" className="typography-body-medium flex items-center gap-2">
      <Checkbox id="checkbox-indeterminate" checked="indeterminate" />
      Indeterminate
    </label>
  );
}
