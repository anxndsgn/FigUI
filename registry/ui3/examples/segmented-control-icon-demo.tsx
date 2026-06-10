"use client";

import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control";

export default function SegmentedControlIconDemo() {
  return (
    <SegmentedControl defaultValue="left">
      <SegmentedControlItem value="left">
        <AlignLeft className="size-3.5" />
      </SegmentedControlItem>
      <SegmentedControlItem value="center">
        <AlignCenter className="size-3.5" />
      </SegmentedControlItem>
      <SegmentedControlItem value="right">
        <AlignRight className="size-3.5" />
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
