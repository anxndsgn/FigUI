"use client";

import {
  NumericInputRoot,
  NumericScrubArea,
  NumericInput,
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
} from "@/registry/ui3/ui/input";

export default function InputGroupXyzDemo() {
  return (
    <InputGroup className="w-64">
      <NumericInputRoot defaultValue={0}>
        <InputGroupAddon>
          <NumericScrubArea className="flex size-6 items-center justify-center text-xs text-grey-500">
            X
          </NumericScrubArea>
        </InputGroupAddon>
        <NumericInput />
      </NumericInputRoot>
      <InputGroupDivider />
      <NumericInputRoot defaultValue={0}>
        <InputGroupAddon>
          <NumericScrubArea className="flex size-6 items-center justify-center text-grey-500">
            Y
          </NumericScrubArea>
        </InputGroupAddon>
        <NumericInput />
      </NumericInputRoot>
      <InputGroupDivider />
      <NumericInputRoot defaultValue={0}>
        <InputGroupAddon>
          <NumericScrubArea className="flex size-6 items-center justify-center text-grey-500">
            Z
          </NumericScrubArea>
        </InputGroupAddon>
        <NumericInput />
      </NumericInputRoot>
    </InputGroup>
  );
}
