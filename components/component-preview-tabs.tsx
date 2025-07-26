'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tabs, Tab, TabsList } from '@/registry/ui3/ui/tabs';
import { Separator } from '@/registry/ui3/ui/separator';
import { CopyButton } from './copy-button';

export function ComponentPreviewTabs({
  className,
  component,
  code,
  sourceComponent,
  ...props
}: React.ComponentProps<'div'> & {
  component: React.ReactNode;
  code: string;
  sourceComponent: React.ReactNode;
}) {
  const [tab, setTab] = React.useState('preview');

  return (
    <div
      className={cn(
        'group not-prose relative mt-4 mb-12 flex flex-col gap-2 overflow-hidden rounded-lg border',
        className,
      )}
      {...props}
    >
      <Tabs
        className='relative mr-auto w-full'
        value={tab}
        onValueChange={setTab}
      >
        <TabsList className='p-2'>
          <Tab value='preview'>Preview</Tab>
          <Tab value='code'>Code</Tab>
          <CopyButton value={code} className='ml-auto' />
        </TabsList>
        <Separator />
        <div data-tab={tab} className='relative md:-mx-1'>
          <div
            data-slot='preview'
            data-active={tab === 'preview'}
            className='hidden data-[active=true]:block'
          >
            <div className={cn('preview flex w-full justify-center p-10')}>
              {component}
            </div>
          </div>
          <div
            data-slot='code'
            data-active={tab === 'code'}
            className='hidden data-[active=true]:block **:[figure]:!m-0'
          >
            {sourceComponent}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
