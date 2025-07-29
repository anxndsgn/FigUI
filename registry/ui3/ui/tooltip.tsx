import { Tooltip as BaseTooltip } from '@base-ui-components/react';
import { cn } from '@/lib/utils';

function Tooltip({
  children,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Root>) {
  return (
    <BaseTooltip.Provider delay={0}>
      <BaseTooltip.Root {...props}>{children}</BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
function TooltipContent({
  children,
  className,
  ...props
}: React.ComponentProps<typeof BaseTooltip.Positioner>) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner sideOffset={10} {...props}>
        <BaseTooltip.Popup
          className={cn(
            'bg-grey-900 typography-body-medium text-white-1000 shadow-300 flex flex-col rounded-md px-2 py-1',
            className,
          )}
        >
          <BaseTooltip.Arrow className='data-[side=bottom]:top-[-6px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180'>
            <ArrowSvg className='text-grey-900' />
          </BaseTooltip.Arrow>
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

function ArrowSvg({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='6'
      viewBox='0 0 12 6'
      className={className}
      {...props}
    >
      <path
        d='M6 5.24537e-07L5.24537e-07 6L12 6L6 5.24537e-07Z'
        fill='currentColor'
      />
    </svg>
  );
}

const TooltipTrigger = BaseTooltip.Trigger;
const TooltipProvider = BaseTooltip.Provider;
const TooltipRoot = BaseTooltip.Root;

export {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipRoot,
  TooltipContent,
};
