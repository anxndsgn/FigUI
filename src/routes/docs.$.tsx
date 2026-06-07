import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsShell } from "../components/site/docs-shell";
import { docsClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";

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
    <DocsShell navTree={data.navTree} currentUrl={data.url} toc={data.toc}>
      {docsClientLoader.useContent(data.path)}
    </DocsShell>
  );
}
