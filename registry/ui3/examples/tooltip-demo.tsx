import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry/ui3/ui/tooltip";
import { Button } from "@/registry/ui3/ui/button";

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Hover</Button>} />
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  );
}
