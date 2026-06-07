import { Link, useRouterState } from "@tanstack/react-router";
import { PanelLeft } from "lucide-react";
import { Button } from "registry/ui3/ui/button";
import { Separator } from "registry/ui3/ui/separator";

import { useDocsSidebar } from "./docs-sidebar-context";
import { ThemeToggle } from "./theme-toggle";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 max-md:h-14 max-md:gap-2.5 max-md:px-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <DocsSidebarTrigger />
          <Link
            to="/"
            className="inline-flex min-h-10 min-w-0 items-center gap-2.5 text-[0.95rem] font-bold"
            activeOptions={{ exact: true }}
          >
            <span className="truncate">FigUI</span>
          </Link>
        </div>

        <nav className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
          <Button
            nativeButton={false}
            variant="ghost"
            render={
              <a
                href="https://github.com/anxndsgn/figui"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              />
            }
          >
            GitHub
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function DocsSidebarTrigger() {
  const { drawerId, isOpen, open } = useDocsSidebar();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!pathname.startsWith("/docs")) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Open documentation navigation"
      aria-controls={drawerId}
      aria-expanded={isOpen}
      onClick={open}
    >
      <PanelLeft size={18} aria-hidden="true" />
    </Button>
  );
}
