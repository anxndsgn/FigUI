import * as React from 'react';
import { Toggle } from '@base-ui-components/react/toggle';
import { ToggleGroup } from '@base-ui-components/react/toggle-group';
import { cn } from '@/lib/utils';

function SegmentedControl(props: React.ComponentProps<typeof ToggleGroup>) {
  return <ToggleGroup {...props}>{props.children}</ToggleGroup>;
}

function SegmentedControlItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  return (
    <Toggle
      className={cn(
        'data-[pressed]:inset-ring-grey-200 data-[pressed]:inset-ring',
        className,
      )}
      {...props}
    >
      {children}
    </Toggle>
  );
}

export { SegmentedControl, SegmentedControlItem };
