import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry/ui3/ui/tooltip";
import { Button } from "@/registry/ui3/ui/button";

export default function TooltipBottomDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Hover</Button>} />
      <TooltipContent side="bottom">This is a tooltip</TooltipContent>
    </Tooltip>
  );
}
