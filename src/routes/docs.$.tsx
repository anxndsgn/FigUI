import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AnchorProvider, TOCItem, useActiveAnchor } from "fumadocs-core/toc";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "registry/ui3/ui/select";
import { DocsShell, type DocsTocItem } from "../components/site/docs-shell";
import { docsClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";
import { cn } from "../lib/utils";

const getDoc = createServerFn({ method: "GET" })
  .inputValidator((slugs: Array<string>) => slugs)
  .handler(async ({ data: slugs }) => getDocPage(slugs));

export const Route = createFileRoute("/docs/$")({
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/").filter(Boolean) ?? [];
    const data = await getDoc({ data: slugs });

    await docsClientLoader.preload(data.path);

    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Docs"} - FigUI`,
      },
      {
        name: "description",
        content: loaderData?.description ?? "Component documentation page.",
      },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
  const data = Route.useLoaderData();

  return (
    <AnchorProvider toc={data.toc} single>
      <DocsShell
        mobileToc={<DocsMobileToc toc={data.toc} />}
        sideToc={<DocsSideToc toc={data.toc} />}
      >
        {docsClientLoader.useContent(data.path)}
      </DocsShell>
    </AnchorProvider>
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

function DocsSideToc({ toc }: { toc: Array<DocsTocItem> }) {
  if (toc.length === 0) return null;

  return (
    <aside
      className="sticky top-0 hidden h-[calc(100dvh-3.5rem-1px)] min-h-0 [@media(min-width:1340px)]:block"
      aria-label="Table of contents"
    >
      <div className="h-full min-h-0 overflow-y-auto">
        <div className="p-4 pt-8">
          <p className="m-0 mb-6 text-xs font-bold text-muted-foreground uppercase">On this page</p>

          <DocsTocNav toc={toc} />
        </div>
      </div>
    </aside>
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
