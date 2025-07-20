import { ComponentPreviewTabs } from '@/components/component-preview-tabs';
import { CodeSource } from '@/components/component-source';

export function ComponentPreview({
  name,
  component: Component,
  src,
  type,
  className,
  align = 'center',
  hideCode = false,
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
      hideCode={hideCode}
      component={Component}
      source={src ? <CodeSource src={src} /> : null}
      {...props}
    />
  );
}
