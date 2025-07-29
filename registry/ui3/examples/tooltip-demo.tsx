import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/registry/ui3/ui/tooltip';
import { Button } from '@/registry/ui3/ui/button';

export function TooltipDemo() {
  return (
    <div className='flex items-center gap-2'>
      <Tooltip>
        <TooltipTrigger render={<Button variant='secondary'>top</Button>} />
        <TooltipContent>This is a tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant='secondary'> bottom</Button>} />
        <TooltipContent side='bottom'>This is a tooltip</TooltipContent>
      </Tooltip>
    </div>
  );
}
