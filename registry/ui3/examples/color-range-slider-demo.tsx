"use client";

import { ColorRangeSlider } from "@/registry/ui3/ui/slider";
import { useState } from "react";

export default function ColorRangeSliderDemo() {
  const [hue, setHue] = useState(180);

  // Convert hue to HSL color
  const selectedColor = `hsl(${hue}, 100%, 50%)`;

  return (
    <div className="flex flex-col gap-6">
      <ColorRangeSlider
        value={hue}
        onValueChange={(value) => setHue(value as number)}
        className={"w-56"}
      />

      <div className="flex items-center gap-3">
        <div
          className="border-gray-200 dark:border-gray-700 h-12 w-12 rounded-lg border"
          style={{ backgroundColor: selectedColor }}
        />
        <div className="text-sm">
          <div className="text-gray-900 dark:text-gray-100 font-medium">Hue: {hue}°</div>
          <div className="text-gray-500 dark:text-gray-400">{selectedColor}</div>
        </div>
      </div>
    </div>
  );
}
