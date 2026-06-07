import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "registry/ui3/ui/button";
import { cn } from "../../lib/utils";

export function CopyButton({
  value,
  label,
  size = 15,
}: {
  value: string;
  label: string;
  size?: number;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 1600);

    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative rounded-sm text-foreground/50 hover:bg-black/5"
      aria-label={label}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      <CopyIcon
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          copied && "scale-[0.25] opacity-0 blur-xs",
        )}
        size={size}
        aria-hidden="true"
      />
      <CheckIcon
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          !copied && "scale-[0.25] opacity-0 blur-xs",
        )}
        size={size}
        aria-hidden="true"
      />
    </Button>
  );
}
