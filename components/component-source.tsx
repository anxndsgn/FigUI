import fs from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';

import { cn, fixImport } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { highlightCode } from '@/lib/highlight-code';
import { Separator } from '@/registry/ui3/ui/seprator';

export async function CodeSource({
  src,
  title,
  language,
}: React.ComponentProps<'div'> & {
  src: string;
  title?: string;
  language?: string;
}) {
  const code = await fs.readFile(path.join(process.cwd(), src), 'utf-8');

  const fixedCode = fixImport(code);

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';
  const highlightedCode = await highlightCode(fixedCode, lang);

  if (!highlightedCode) {
    return null;
  }

  return (
    <figure
      data-rehype-pretty-code-figure=''
      className='not-prose dark:bg-black-800'
    >
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}

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

  return (
    <div className={cn('relative', className)}>
      <div className='not-prose overflow-hidden rounded-lg border [&>pre]:max-h-96'>
        {title && (
          <figcaption
            data-rehype-pretty-code-title=''
            className='typography-body-medium-strong flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70'
            data-language={language}
          >
            {title}
          </figcaption>
        )}
        <Separator />
        <CodeSource src={src} title={title} language={language} />
      </div>
    </div>
  );
}
