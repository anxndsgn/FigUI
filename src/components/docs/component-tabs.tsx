import { Children, isValidElement, useMemo, type ReactElement, type ReactNode } from "react";
import { Separator } from "registry/ui3/ui/separator";
import { Tab, Tabs, TabsList, TabsPanel } from "registry/ui3/ui/tabs";
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
    <Tabs className="w-full rounded-lg border" defaultValue={defaultValue}>
      <TabsList aria-label="Component view" className="p-2">
        <Tab value="preview">Preview</Tab>
        <Tab value="source">Source</Tab>
      </TabsList>
      <Separator />
      <TabsPanel value="preview" className="min-h-65 data-hidden:hidden">
        {slots.preview}
      </TabsPanel>
      <TabsPanel
        value="source"
        className="min-h-65 data-hidden:hidden [&>figure]:rounded-none [&>figure]:border-0"
      >
        {slots.source}
      </TabsPanel>
    </Tabs>
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
