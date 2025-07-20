import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

import { cn, fixImport } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { highlightCode } from '@/lib/highlight-code';

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
  const highlightedCode = await highlightCode(fixedCode, lang);

  return (
    <div className={cn('relative', className)}>
      <figure data-rehype-pretty-code-figure='' className='[&>pre]:max-h-96'>
        {title && (
          <figcaption
            data-rehype-pretty-code-title=''
            className='flex items-center gap-2 font-mono text-sm [&_svg]:size-4 [&_svg]:opacity-70'
            data-language={language}
          >
            {title}
          </figcaption>
        )}
        <CopyButton value={code} />
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </figure>
    </div>
  );
}
