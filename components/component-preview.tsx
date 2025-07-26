import { ComponentPreviewTabs } from '@/components/component-preview-tabs';
import { CodeBlock } from '@/components/code-block';

export function ComponentPreview({
  name,
  component: Component,
  src,
  type,
  className,
  align = 'center',
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  component?: React.ReactNode;
  src?: string;
  align?: 'center' | 'start' | 'end';
  description?: string;
  hideCode?: boolean;
  type?: 'block' | 'component' | 'example';
}) {
  if (!Component && type !== 'block') {
    return (
      <p className='text-muted-foreground text-sm'>
        Component{' '}
        <code className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'>
          {name}
        </code>{' '}
        not provided.
      </p>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      component={Component}
      source={src ? <CodeBlock src={src} /> : null}
      {...props}
    />
  );
}
