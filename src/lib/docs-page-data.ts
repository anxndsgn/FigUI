import { notFound } from "@tanstack/react-router";
import { getDocsTocItems } from "./docs-navigation";
import { source } from "./source";

export function getDocPage(slugs: Array<string>) {
  const page = source.getPage(slugs);

  if (!page) {
    throw notFound();
  }

  return {
    path: page.path,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    toc: getDocsTocItems(page.data.toc),
  };
}
