"use client";

import { ColorInput } from "@/registry/ui3/ui/input/color-input";
import { OpacitySlider } from "@/registry/ui3/ui/slider";
import { useState } from "react";

export default function OpacitySliderDemo() {
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("FF0505");

  return (
    <div className="flex flex-col gap-4">
      <ColorInput className="w-32" value={color} onValueChange={setColor} />
      <OpacitySlider
        value={opacity}
        onValueChange={setOpacity}
        color={`#${color}`}
        className="w-56"
      />
    </div>
  );
}
