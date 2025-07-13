import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

import { cn } from '@/lib/utils';
import { CodeCollapsibleWrapper } from '@/components/code-collapsible-wrapper';

export async function ComponentSource({
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<'div'> & {
  src: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!src) {
    return null;
  }

  const code = await fs.readFile(path.join(process.cwd(), src), 'utf-8');

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';

  if (!collapsible) {
    return (
      <div className={cn('relative', className)}>
        <DynamicCodeBlock lang={lang} code={code} />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <DynamicCodeBlock lang={lang} code={code} />
    </CodeCollapsibleWrapper>
  );
}
