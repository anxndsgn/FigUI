"use client";

import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control";

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl defaultValue="list">
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="code">Code</SegmentedControlItem>
    </SegmentedControl>
  );
}
