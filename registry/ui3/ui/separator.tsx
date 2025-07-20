import { Separator as BaseSeparator } from '@base-ui-components/react/separator';
import { cn } from '@/lib/utils';

export function Separator({
  className,
  ...props
}: React.ComponentProps<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      className={cn(
        'bg-grey-200 dark:bg-grey-700 data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  );
}
