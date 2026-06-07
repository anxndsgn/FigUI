import { Tabs } from "@base-ui/react/tabs";
import { Children, isValidElement, useMemo, type ReactElement, type ReactNode } from "react";
import { ComponentSource } from "./component-source";

type TabValue = "preview" | "source";

export function ComponentTabs({
  children,
  preview,
  source,
  defaultValue = "preview",
}: {
  children?: ReactNode;
  preview?: ReactNode;
  source?: ReactNode | string;
  defaultValue?: TabValue;
}) {
  const slots = useMemo(() => resolveSlots(children, preview, source), [children, preview, source]);

  return (
    <Tabs.Root
      className="relative flex flex-col gap-1.5 overflow-hidden"
      defaultValue={defaultValue}
    >
      <Tabs.List
        className="inline-flex w-fit max-w-full gap-0.5 self-start rounded-md bg-muted p-0.5"
        aria-label="Component view"
      >
        <Tabs.Tab
          value="preview"
          className={
            "min-h-8 w-fit rounded-sm bg-transparent px-3 text-xs text-foreground/65 hover:bg-transparent hover:text-foreground data-active:bg-background data-active:font-semibold data-active:text-foreground data-active:shadow-sm"
          }
        >
          Preview
        </Tabs.Tab>
        <Tabs.Tab
          value="source"
          className={
            "min-h-8 w-fit rounded-sm bg-transparent px-3 text-xs text-foreground/65 hover:bg-transparent hover:text-foreground data-active:bg-background data-active:font-semibold data-active:text-foreground data-active:shadow-sm"
          }
        >
          Source
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="preview" className="block min-h-65 data-hidden:hidden">
        {slots.preview}
      </Tabs.Panel>
      <Tabs.Panel value="source" className="min-h-65 data-hidden:hidden [&>figure]:border-0">
        {slots.source}
      </Tabs.Panel>
    </Tabs.Root>
  );
}

function resolveSlots(children: ReactNode, preview?: ReactNode, source?: ReactNode | string) {
  const childArray = Children.toArray(children);
  const childPreview = childArray.find((child) => hasDisplayName(child, "ComponentPreview"));
  const childSource = childArray.find((child) => hasDisplayName(child, "ComponentSource"));

  return {
    preview: preview ?? childPreview ?? null,
    source:
      typeof source === "string" ? (
        <ComponentSource code={source} />
      ) : (
        (source ?? childSource ?? null)
      ),
  };
}

function hasDisplayName(child: ReactNode, displayName: string): child is ReactElement {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    "displayName" in child.type &&
    child.type.displayName === displayName
  );
}
