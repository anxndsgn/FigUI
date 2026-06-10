"use client";

import { ColorInput } from "@/registry/ui3/ui/input";
import { useState } from "react";

export default function ColorInputDemo() {
  const [color, setColor] = useState("FF24BD");

  return <ColorInput className="w-32" value={color} onValueChange={setColor} />;
}
