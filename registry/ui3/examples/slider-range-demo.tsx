"use client";

import React from "react";
import { Slider } from "../ui/slider";

export default function SliderRangeDemo() {
  const [value, setValue] = React.useState([25, 45]);

  return (
    <Slider
      className="w-64"
      value={value}
      onValueChange={(value) => setValue(value as number[])}
    />
  );
}
