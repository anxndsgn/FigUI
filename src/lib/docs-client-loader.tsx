import browserCollections from "collections/browser";
import { DocsArticle } from "../components/site/docs-article";
import { getMDXComponents } from "../components/mdx/mdx-components";

export const docsClientLoader = browserCollections.docs.createClientLoader({
  component({ frontmatter, default: MDX }) {
    return (
      <DocsArticle title={frontmatter.title} description={frontmatter.description}>
        <MDX components={getMDXComponents()} />
      </DocsArticle>
    );
  },
});
