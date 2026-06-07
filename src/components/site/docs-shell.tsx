import { type ReactNode } from "react";

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
  mobileToc,
  sideToc,
  children,
}: {
  mobileToc?: ReactNode;
  sideToc?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {mobileToc}

      <div className="row-start-2 min-h-0 min-w-0 overflow-auto md:col-start-2 md:row-start-1">
        <div className="min-h-full [@media(min-width:1340px)]:grid [@media(min-width:1340px)]:grid-cols-[minmax(0,1fr)_240px]">
          <section className="mx-auto w-[min(100%,940px)] min-w-0 px-10 py-12 pb-18 max-md:w-[min(calc(100%-28px),940px)] max-md:px-0 max-md:py-9 max-md:pb-14">
            {children}
          </section>

          {sideToc}
        </div>
      </div>
    </>
  );
}
