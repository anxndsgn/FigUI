"use client";

import { NumericInputRoot, NumericInput } from "@/registry/ui3/ui/input";

export default function NumericInputDemo() {
  return (
    <NumericInputRoot defaultValue={12} min={0} max={100} className="w-32">
      <NumericInput />
    </NumericInputRoot>
  );
}
