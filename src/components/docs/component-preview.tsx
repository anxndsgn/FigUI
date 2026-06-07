import type { ReactNode } from "react";

export function ComponentPreview({ children, name }: { children: ReactNode; name?: string }) {
  return (
    <div className="grid gap-3 rounded-lg border border-border">
      {name ? (
        <div className="border-b border-border p-4 text-xs font-bold text-muted-foreground">
          {name}
        </div>
      ) : null}
      <div className="grid min-h-48 place-items-center p-4">{children}</div>
    </div>
  );
}

ComponentPreview.displayName = "ComponentPreview";
