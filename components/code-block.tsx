import { getCode } from '@/lib/get-code';
import { highlightCode } from '@/lib/highlight-code';

import { CopyButton } from './copy-button';

export async function CodeBlock({
  src,
  title,
  language,
}: React.ComponentProps<'div'> & {
  src: string;
  title?: string;
  language?: string;
}) {
  const code = await getCode(src);

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split('.').pop() ?? 'tsx';
  const highlightedCode = await highlightCode(code, lang);

  if (!highlightedCode) {
    return null;
  }

  return (
    <figure
      data-rehype-pretty-code-figure=''
      className='not-prose max-h-96 overflow-auto'
    >
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}
