import * as React from 'react';

import { cn } from '@/lib/utils';
import { Separator } from '@/registry/ui3/ui/separator';
import { CodeBlock } from './code-block';

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
        <CodeBlock src={src} title={title} language={language} />
      </div>
    </div>
  );
}
