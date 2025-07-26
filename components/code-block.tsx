import { highlightCode } from '@/lib/highlight-code';

import { CopyButton } from './copy-button';

export async function CodeBlock({
  code,
  title,
  language,
}: React.ComponentProps<'div'> & {
  code: string;
  title?: string;
  language?: string;
}) {
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
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}
