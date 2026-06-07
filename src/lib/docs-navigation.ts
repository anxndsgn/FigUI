import type {
  Item as PageTreeItem,
  Node as PageTreeNode,
  Root as PageTreeRoot,
} from "fumadocs-core/page-tree";
import { isValidElement, type ReactNode } from "react";
import type {
  DocsNavItem,
  DocsNavNode,
  DocsNavTree,
  DocsTocItem,
} from "../components/site/docs-shell";
import { source } from "./source";

export function getDocsNavTree(): DocsNavTree {
  const tree = source.getPageTree();

  return {
    title: getReactNodeText(tree.name) || "Docs",
    nodes: getDocsNavNodes(tree),
  };
}

export function getDocsNavItems() {
  return source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
  })) satisfies Array<DocsNavItem>;
}

export function getDocsTocItems(toc: Array<{ title: ReactNode; url: string; depth: number }> = []) {
  return toc.map((item) => ({
    title: getReactNodeText(item.title),
    url: item.url,
    depth: item.depth,
  })) satisfies Array<DocsTocItem>;
}

function getDocsNavNodes(tree: PageTreeRoot) {
  return tree.children.map(getDocsNavNode).filter((node): node is DocsNavNode => node !== null);
}

function getDocsNavNode(node: PageTreeNode): DocsNavNode | null {
  if (node.type === "page") {
    return getDocsNavPage(node);
  }

  if (node.type === "separator") {
    return {
      type: "separator",
      title: node.name ? getReactNodeText(node.name) : undefined,
    };
  }

  return {
    type: "folder",
    title: getReactNodeText(node.name),
    url: node.index?.url,
    children: node.children
      .map(getDocsNavNode)
      .filter((child): child is DocsNavNode => child !== null),
  };
}

function getDocsNavPage(node: PageTreeItem): DocsNavNode {
  return {
    type: "page",
    title: getReactNodeText(node.name),
    description: node.description ? getReactNodeText(node.description) : undefined,
    url: node.url,
  };
}

function getReactNodeText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(getReactNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return getReactNodeText(value.props.children);
  }

  return "";
}
