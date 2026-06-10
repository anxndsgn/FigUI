"use client";

import { Checkbox } from "@/registry/ui3/ui/checkbox";
import { useState } from "react";

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <label htmlFor="checkbox" className="typography-body-medium flex items-center gap-2">
      <Checkbox id="checkbox" checked={checked} onCheckedChange={setChecked} />
      Checkbox
    </label>
  );
}
