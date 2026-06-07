import { cn } from "../../lib/utils";

export function MdxTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-border bg-card">
      <table className={cn("w-full min-w-[640px] border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function MdxThead({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("bg-muted/50", className)} {...props} />;
}

export function MdxTbody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />;
}

export function MdxTr({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("border-b border-border last:border-b-0", className)} {...props} />;
}

export function MdxTh({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "px-3.5 py-3 text-left align-top text-xs font-bold text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function MdxTd({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn("px-3.5 py-3 text-left align-top leading-6 text-foreground", className)}
      {...props}
    />
  );
}
