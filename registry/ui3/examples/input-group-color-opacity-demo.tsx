"use client";

import { useState } from "react";
import {
  ColorInput,
  ColorChit,
  InputGroup,
  InputGroupAddon,
  InputGroupDivider,
  NumericInputRoot,
  NumericInput,
  NumericScrubArea,
} from "@/registry/ui3/ui/input";

export default function InputGroupColorOpacityDemo() {
  const [color, setColor] = useState("FF24BD");
  const [opacity, setOpacity] = useState(100);

  return (
    <InputGroup className="w-52">
      <InputGroupAddon>
        <ColorChit color={color} opacity={opacity} />
      </InputGroupAddon>
      <ColorInput value={color} onValueChange={setColor} />
      <InputGroupDivider />
      <NumericInputRoot
        value={opacity}
        min={0}
        max={100}
        onValueChange={(next) => setOpacity(Number(next) || 0)}
      >
        <NumericInput className="w-10" />
        <InputGroupAddon className="typography-body-medium text-xs text-grey-500">
          <NumericScrubArea>%</NumericScrubArea>
        </InputGroupAddon>
      </NumericInputRoot>
    </InputGroup>
  );
}
