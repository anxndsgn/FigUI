import Image from 'next/image';

import { ComponentPreviewTabs } from '@/components/component-preview-tabs';
import { ComponentSource } from '@/components/component-source';

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

  if (type === 'block') {
    return (
      <div className='relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-1'>
        <Image
          src={`/r/styles/new-york-v4/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className='bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden'
        />
        <Image
          src={`/r/styles/new-york-v4/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className='bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden'
        />
        <div className='bg-background absolute inset-0 hidden w-[1600px] md:block'>
          <iframe src={`/view/${name}`} className='size-full' />
        </div>
      </div>
    );
  }

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      component={Component}
      source={src ? <ComponentSource src={src} collapsible={false} /> : null}
      {...props}
    />
  );
}
