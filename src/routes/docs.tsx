import { Drawer } from "@base-ui/react/drawer";
import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronRightIcon, XIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { buttonVariants } from "registry/ui3/ui/button";
import { type DocsNavNode, type DocsNavTree } from "../components/site/docs-shell";
import { DocsHeader } from "../components/site/docs-header";
import { useDocsSidebar } from "../components/site/docs-sidebar-context";
import { getDocsNavTree } from "../lib/docs-navigation";

const getDocsNav = createServerFn({ method: "GET" }).handler(async () => getDocsNavTree());

export const Route = createFileRoute("/docs")({
  loader: async () => getDocsNav(),
  component: DocsLayout,
});

function DocsLayout() {
  const navTree = Route.useLoaderData();
  const currentUrl = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden">
      <DocsHeader />
      <main className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden md:grid-cols-[264px_minmax(0,1fr)] md:grid-rows-1">
        <DocsMobileNav navTree={navTree} currentUrl={currentUrl} />
        <DocsSidebar navTree={navTree} currentUrl={currentUrl} />
        <Outlet />
      </main>
    </div>
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
                  <Drawer.Title className="m-0 truncate text-base font-bold">FigUI</Drawer.Title>
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

function DocsSidebar({ navTree, currentUrl }: { navTree: DocsNavTree; currentUrl: string }) {
  return (
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
    return <DocsSidebarFolder node={node} currentUrl={currentUrl} onNavigate={onNavigate} />;
  }

  return (
    <DocsSidebarLink
      url={node.url}
      currentUrl={currentUrl}
      className="flex min-h-9 items-center rounded-md px-2.5 text-sm font-medium text-muted-foreground hover:bg-accent data-[active=true]:bg-accent data-[active=true]:font-semibold data-[active=true]:text-foreground"
      onNavigate={onNavigate}
    >
      {node.title}
    </DocsSidebarLink>
  );
}

function DocsSidebarFolder({
  node,
  currentUrl,
  onNavigate,
}: {
  node: Extract<DocsNavNode, { type: "folder" }>;
  currentUrl: string;
  onNavigate?: () => void;
}) {
  const [isCollapsed, setCollapsed] = useState(false);
  const isExpanded = !isCollapsed;
  const toggleFolder = () => setCollapsed((value) => !value);

  const title = node.url ? (
    <div className="flex min-h-9 items-center gap-1">
      <DocsSidebarLink
        url={node.url}
        currentUrl={currentUrl}
        isActiveEnabled={false}
        className="flex min-h-9 min-w-0 flex-1 items-center rounded-md px-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:font-semibold data-[active=true]:text-foreground"
        onNavigate={onNavigate}
      >
        <span className="truncate">{node.title}</span>
      </DocsSidebarLink>
      <button
        type="button"
        className="inline-flex size-8 flex-none items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label={`${isExpanded ? "Collapse" : "Expand"} ${node.title}`}
        aria-expanded={isExpanded}
        onClick={toggleFolder}
      >
        <ChevronRightIcon
          size={16}
          className="transition-transform duration-150 data-[expanded=true]:rotate-90"
          data-expanded={isExpanded}
          aria-hidden="true"
        />
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="flex min-h-9 w-full items-center justify-between gap-2 rounded-md px-2.5 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      aria-expanded={isExpanded}
      onClick={toggleFolder}
    >
      <span className="truncate">{node.title}</span>
      <ChevronRightIcon
        size={16}
        className="flex-none transition-transform duration-150 data-[expanded=true]:rotate-90"
        data-expanded={isExpanded}
        aria-hidden="true"
      />
    </button>
  );

  return (
    <div className="grid gap-1">
      {title}
      {isExpanded ? (
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
      ) : null}
    </div>
  );
}

function DocsSidebarLink({
  url,
  currentUrl,
  isActiveEnabled = true,
  className,
  onNavigate,
  children,
}: {
  url: string;
  currentUrl: string;
  isActiveEnabled?: boolean;
  className: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  const isActive = isActiveEnabled && normalizeUrl(url) === normalizeUrl(currentUrl);
  const splat = getDocsSplat(url);

  if (splat === null) {
    return (
      <Link to="/docs" className={className} data-active={isActive} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      to="/docs/$"
      params={{ _splat: splat }}
      className={className}
      data-active={isActive}
      onClick={onNavigate}
    >
      {children}
    </Link>
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

function getDocsSplat(url: string) {
  const normalized = normalizeUrl(url);

  if (normalized === "/docs") return null;

  return normalized.replace(/^\/docs\//, "");
}
