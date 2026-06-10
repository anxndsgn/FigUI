"use client";

import { useState } from "react";
import { ColorInput, ColorChit, InputGroup, InputGroupAddon } from "@/registry/ui3/ui/input";

export default function InputGroupColorDemo() {
  const [color, setColor] = useState("FF24BD");

  return (
    <InputGroup className="w-36">
      <InputGroupAddon>
        <ColorChit color={color} />
      </InputGroupAddon>
      <ColorInput value={color} onValueChange={setColor} />
    </InputGroup>
  );
}
