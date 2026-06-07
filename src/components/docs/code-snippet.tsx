import { Tabs } from "@base-ui/react/tabs";
import { Children, isValidElement, useMemo, type ReactElement, type ReactNode } from "react";
import { defaultPackageManager, useUiStore } from "../../lib/ui-store";
import { cn } from "../../lib/utils";
import { highlightCodeToHtml } from "./code-block";
import { CopyButton } from "./copy-button";

type CodeSnippetSlot = {
  value: string;
  command: string;
};

type CodeSnippetCommandProps = {
  value: string;
  children: ReactNode;
};

function CodeSnippetRoot({
  command,
  className,
  children,
}: {
  command?: string;
  className?: string;
  children?: ReactNode;
}) {
  const selectedValue = useUiStore((state) => state.packageManager);
  const setPackageManager = useUiStore((state) => state.setPackageManager);
  const slots = useMemo(() => resolveSlots(children), [children]);
  const activeSlot = findActiveSlot(slots, selectedValue);
  const activeValue = activeSlot?.value ?? defaultPackageManager;
  const activeCommand = activeSlot?.command ?? command;
  const hasTabs = slots.length > 1;

  if (!activeCommand) return null;

  if (!hasTabs) {
    return (
      <span
        className={cn(
          "flex w-full items-center gap-1.5 text-foreground max-md:justify-between",
          className,
        )}
      >
        <CodeSnippetCommandLine command={activeCommand} />
      </span>
    );
  }

  return (
    <Tabs.Root
      value={activeValue}
      onValueChange={(value) => {
        if (typeof value === "string") {
          setPackageManager(value);
        }
      }}
      className={cn(
        "flex w-full items-center gap-1.5 text-foreground max-md:justify-between",
        "flex-col items-stretch justify-start gap-1.5 rounded-lg max-md:justify-start",
        className,
      )}
    >
      <Tabs.List
        className="inline-flex w-fit max-w-full gap-0.5 self-start rounded-md bg-muted p-0.5"
        aria-label="Package manager"
      >
        {slots.map((slot) => (
          <Tabs.Tab
            key={slot.value}
            value={slot.value}
            className={
              "min-h-8 w-fit rounded-sm bg-transparent px-3 text-xs text-foreground/65 hover:bg-transparent hover:text-foreground data-active:bg-background data-active:font-semibold data-active:text-foreground data-active:shadow-sm"
            }
          >
            {slot.value}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {slots.map((slot) => (
        <Tabs.Panel key={slot.value} value={slot.value} className="min-h-10 data-hidden:hidden">
          <CodeSnippetCommandLine command={slot.command} hasTabs />
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

function CodeSnippetCommandLine({
  command,
  hasTabs = false,
}: {
  command: string;
  hasTabs?: boolean;
}) {
  const highlightedCommand = highlightCodeToHtml(command, "shellscript");

  return (
    <span
      className={cn(
        "flex w-full min-w-0 items-center gap-1.5 rounded-md bg-muted p-2",
        hasTabs && "min-h-10",
      )}
    >
      <code
        className="min-w-0 flex-1 truncate pl-2 whitespace-nowrap"
        dangerouslySetInnerHTML={{ __html: highlightedCommand }}
      />
      <CopyButton value={command} label="Copy command" size={14} />
    </span>
  );
}

function CodeSnippetCommand({ children }: CodeSnippetCommandProps) {
  return <>{children}</>;
}

CodeSnippetCommand.displayName = "CodeSnippetCommand";

function resolveSlots(children: ReactNode): CodeSnippetSlot[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isCodeSnippetCommand(child)) return [];

    const command = toCommandString(child.props.children);
    if (!child.props.value || !command) return [];

    return [
      {
        value: child.props.value,
        command,
      },
    ];
  });
}

function findActiveSlot(slots: CodeSnippetSlot[], selectedValue: string) {
  return (
    slots.find((slot) => slot.value === selectedValue) ??
    slots.find((slot) => slot.value === "pnpm") ??
    slots[0]
  );
}

function toCommandString(value: ReactNode): string {
  return collectText(value).replace(/\s+/g, " ").trim();
}

function collectText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(collectText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return collectText(value.props.children);
  }

  return "";
}

function isCodeSnippetCommand(child: ReactNode): child is ReactElement<CodeSnippetCommandProps> {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    "displayName" in child.type &&
    child.type.displayName === "CodeSnippetCommand"
  );
}

export const CodeSnippet = Object.assign(CodeSnippetRoot, {
  Command: CodeSnippetCommand,
});

export { CodeSnippetCommand };
