import { CodeBlock } from "./code-block";

export function ComponentSource({
  code,
  language = "tsx",
  title = "Source",
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  return <CodeBlock code={code} language={language} title={title} />;
}

ComponentSource.displayName = "ComponentSource";
