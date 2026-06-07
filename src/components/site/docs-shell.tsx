import { Drawer } from "@base-ui/react/drawer";
import { AnchorProvider, TOCItem, useActiveAnchor } from "fumadocs-core/toc";
import { XIcon } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { buttonVariants } from "registry/ui3/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "registry/ui3/ui/select";
import { useDocsSidebar } from "./docs-sidebar-context";
import { DocsHeader } from "./docs-header";
import { cn } from "@/lib/utils";

export type DocsNavItem = {
  title: string;
  description?: string;
  url: string;
};

export type DocsNavNode =
  | {
      type: "page";
      title: string;
      description?: string;
      url: string;
    }
  | {
      type: "folder";
      title: string;
      url?: string;
      children: Array<DocsNavNode>;
    }
  | {
      type: "separator";
      title?: string;
    };

export type DocsNavTree = {
  title: string;
  nodes: Array<DocsNavNode>;
};

export type DocsTocItem = {
  title: string;
  url: string;
  depth: number;
};

export function DocsShell({
  navTree,
  currentUrl,
  toc = [],
  children,
}: {
  navTree: DocsNavTree;
  currentUrl: string;
  toc?: Array<DocsTocItem>;
  children: ReactNode;
}) {
  return (
    <AnchorProvider toc={toc} single>
      <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
        <DocsHeader />
        <main className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden md:grid-cols-[264px_minmax(0,1fr)] md:grid-rows-1">
          <DocsMobileNav navTree={navTree} currentUrl={currentUrl} />

          <aside
            className="hidden min-h-0 border-r border-border md:col-start-1 md:row-start-1 md:block"
            aria-label="Documentation navigation"
          >
            <div className="h-full min-h-0 overflow-y-auto">
              <div className="grid gap-6 py-4 pr-4 pb-10 pl-4">
                <nav className="grid gap-1" aria-label="Docs pages">
                  {navTree.nodes.map((node, index) => (
                    <DocsSidebarNode
                      key={getNavNodeKey(node, index)}
                      node={node}
                      currentUrl={currentUrl}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <DocsMobileToc toc={toc} />

          <div className="row-start-2 min-h-0 min-w-0 overflow-auto md:col-start-2 md:row-start-1">
            <div className="min-h-full [@media(min-width:1340px)]:grid [@media(min-width:1340px)]:grid-cols-[minmax(0,1fr)_240px]">
              <section className="mx-auto w-[min(100%,940px)] min-w-0 px-10 py-12 pb-18 max-md:w-[min(calc(100%-28px),940px)] max-md:px-0 max-md:py-9 max-md:pb-14">
                {children}
              </section>

              {toc.length > 0 ? (
                <aside
                  className="sticky top-0 hidden h-[calc(100dvh-3.5rem-1px)] min-h-0 [@media(min-width:1340px)]:block"
                  aria-label="Table of contents"
                >
                  <div className="h-full min-h-0 overflow-y-auto">
                    <div className="p-4 pt-8">
                      <p className="m-0 mb-6 text-xs font-bold text-muted-foreground uppercase">
                        On this page
                      </p>

                      <DocsTocNav toc={toc} />
                    </div>
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </AnchorProvider>
  );
}

function DocsMobileNav({ navTree, currentUrl }: { navTree: DocsNavTree; currentUrl: string }) {
  const { drawerId, isOpen, setOpen, close } = useDocsSidebar();

  useEffect(() => {
    close();
  }, [currentUrl, close]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setOpen} swipeDirection="left">
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-foreground opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))] transition-opacity ease-[cubic-bezier(0.32,0.72,0,1)] [--backdrop-opacity:0.25] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 md:hidden" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-stretch justify-start p-(--viewport-padding) [--viewport-padding:0px] md:hidden">
          <Drawer.Popup
            id={drawerId}
            className="grid h-full w-[min(86vw,320px)] transform-[translateX(var(--drawer-swipe-movement-x))] touch-auto grid-rows-[auto_minmax(0,1fr)] overflow-hidden overscroll-contain bg-background text-foreground shadow-2xl transition-transform ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:transform-[translateX(calc(-100%-var(--viewport-padding)-2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-[translateX(calc(-100%-var(--viewport-padding)-2px))] data-swiping:duration-0 data-swiping:select-none"
          >
            <Drawer.Content className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]">
              <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border px-4">
                <div className="min-w-0">
                  <Drawer.Title className="m-0 truncate text-base font-bold">
                    FigUI
                  </Drawer.Title>
                </div>
                <Drawer.Close
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "flex-none text-muted-foreground",
                  })}
                  aria-label="Close documentation navigation"
                >
                  <XIcon size={18} aria-hidden="true" />
                </Drawer.Close>
              </div>
              <nav className="grid content-start gap-1 overflow-auto p-3" aria-label="Docs pages">
                {navTree.nodes.map((node, index) => (
                  <DocsSidebarNode
                    key={getNavNodeKey(node, index)}
                    node={node}
                    currentUrl={currentUrl}
                    onNavigate={close}
                  />
                ))}
              </nav>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function DocsMobileToc({ toc }: { toc: Array<DocsTocItem> }) {
  const activeAnchor = useActiveAnchor();

  if (toc.length === 0) return null;

  const activeUrl = activeAnchor ? `#${activeAnchor}` : "";
  const items = toc.map((item) => ({ label: item.title, value: item.url }));

  return (
    <div className="z-10 border-b border-border bg-background/95 p-4 pb-3 backdrop-blur-md md:hidden">
      <Select
        items={items}
        value={activeUrl || null}
        onValueChange={(value) => {
          if (typeof value === "string") {
            window.location.hash = value;
          }
        }}
      >
        <SelectTrigger aria-label="On this page" className="w-full">
          <SelectValue placeholder="On this page" className="min-w-0 flex-1 truncate" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {toc.map((item) => (
              <SelectItem key={item.url} value={item.url}>
                <span className="truncate">{item.title}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function DocsTocNav({ toc, className }: { toc: Array<DocsTocItem>; className?: string }) {
  return (
    <nav className={cn("grid gap-3", className)} aria-label="Page sections">
      {toc.map((item) => (
        <TOCItem
          key={item.url}
          href={item.url}
          className="block text-xs text-muted-foreground no-underline hover:text-accent-foreground data-[active=true]:border-accent data-[active=true]:font-semibold data-[active=true]:text-accent-foreground"
          style={{
            paddingLeft: `${Math.max(0, item.depth - 2) * 8}px`,
          }}
        >
          {item.title}
        </TOCItem>
      ))}
    </nav>
  );
}

function DocsSidebarNode({
  node,
  currentUrl,
  onNavigate,
}: {
  node: DocsNavNode;
  currentUrl: string;
  onNavigate?: () => void;
}) {
  if (node.type === "separator") {
    return node.title ? (
      <p className="m-0 px-2.5 text-xs font-bold text-muted-foreground uppercase">{node.title}</p>
    ) : (
      <div className="h-px bg-border" aria-hidden="true" />
    );
  }

  if (node.type === "folder") {
    const title = node.url ? (
      <a
        href={node.url}
        className="flex min-h-9 items-center justify-between rounded-md px-2.5 text-xs font-bold text-muted-foreground uppercase transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent hover:text-accent-foreground active:scale-[0.96] data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
        data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
        onClick={onNavigate}
      >
        {node.title}
      </a>
    ) : (
      <p className="m-0 px-2.5 pt-2 text-xs font-semibold text-muted-foreground/60">{node.title}</p>
    );

    return (
      <div className="grid gap-1">
        {title}
        <div className="grid gap-0.5">
          {node.children.map((child, index) => (
            <DocsSidebarNode
              key={getNavNodeKey(child, index)}
              node={child}
              currentUrl={currentUrl}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <a
      href={node.url}
      className="flex min-h-9 items-center rounded-md px-2.5 text-sm font-medium text-muted-foreground hover:bg-accent data-[active=true]:bg-accent data-[active=true]:font-semibold data-[active=true]:text-foreground"
      data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
      onClick={onNavigate}
    >
      {node.title}
    </a>
  );
}

function getNavNodeKey(node: DocsNavNode, index: number) {
  if (node.type === "page" || node.type === "folder") {
    return node.url ?? `${node.title}-${index}`;
  }

  return node.title ?? `separator-${index}`;
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "") || "/";
}
