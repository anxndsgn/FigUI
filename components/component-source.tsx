import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

import { cn, fixImport } from '@/lib/utils';

export async function ComponentSource({
  src,
  title,
  language,
  className,
}: React.ComponentProps<'div'> & {
  src: string;
  title?: string;
  language?: string;
}) {
  if (!src) {
    return null;
  }

  const code = await fs.readFile(path.join(process.cwd(), src), 'utf-8');

  const fixedCode = fixImport(code);

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';

  return (
    <div className={cn('relative', className)}>
      <DynamicCodeBlock lang={lang} code={fixedCode} />
    </div>
  );
}
