"use client";

import {
  NumericInputRoot,
  NumericScrubArea,
  NumericInput,
  InputGroup,
  InputGroupAddon,
} from "@/registry/ui3/ui/input";

export default function InputGroupScrubNumericDemo() {
  return (
    <NumericInputRoot defaultValue={50} min={0} max={100}>
      <InputGroup className="w-32">
        <InputGroupAddon>
          <NumericScrubArea className="flex size-6 items-center justify-center text-xs text-grey-500">
            X
          </NumericScrubArea>
        </InputGroupAddon>
        <NumericInput />
      </InputGroup>
    </NumericInputRoot>
  );
}
