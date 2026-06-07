import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsShell } from "../components/site/docs-shell";
import { docsClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";

const getIndexDoc = createServerFn({ method: "GET" }).handler(async () => getDocPage([]));

export const Route = createFileRoute("/docs/")({
  loader: async () => {
    const data = await getIndexDoc();

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
  component: DocsIndexPage,
});

function DocsIndexPage() {
  const data = Route.useLoaderData();

  return (
    <DocsShell navTree={data.navTree} currentUrl={data.url} toc={data.toc}>
      {docsClientLoader.useContent(data.path)}
    </DocsShell>
  );
}
