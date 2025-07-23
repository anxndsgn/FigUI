import {
  SegmentedControl,
  SegmentedControlItem,
} from '../ui/segmented-control';

export default function SegmentedControlDemo() {
  return (
    <SegmentedControl>
      <SegmentedControlItem value='option1'>Option 1</SegmentedControlItem>
      <SegmentedControlItem value='option2'>Option 2</SegmentedControlItem>
      <SegmentedControlItem value='option3'>Option 3</SegmentedControlItem>
    </SegmentedControl>
  );
}
