import { ComponentPreviewTabs } from '@/components/component-preview-tabs';
import { CodeBlock } from '@/components/code-block';
import { getCode } from '@/lib/get-code';

export async function ComponentPreview({
  name,
  component: Component,
  src,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  component?: React.ReactNode;
  src?: string;
  description?: string;
  hideCode?: boolean;
  type?: 'block' | 'component' | 'example';
}) {
  if (!src) {
    return null;
  }

  const code = await getCode(src);

  if (!code) {
    return null;
  }

  return (
    <ComponentPreviewTabs
      className={className}
      component={Component}
      code={code}
      sourceComponent={src ? <CodeBlock code={code} /> : null}
      {...props}
    />
  );
}
