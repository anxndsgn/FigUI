'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tabs, Tab, TabsList, TabsPanel } from '@/registry/ui3/ui/tabs';
import { Separator } from '@/registry/ui3/ui/separator';

export function ComponentPreviewTabs({
  className,
  align = 'center',
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<'div'> & {
  align?: 'center' | 'start' | 'end';
  hideCode?: boolean;
  component: React.ReactNode;
  source: React.ReactNode;
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
        </TabsList>
        <Separator />
        <div data-tab={tab} className='relative md:-mx-1'>
          <div
            data-slot='preview'
            data-active={tab === 'preview'}
            className='hidden data-[active=true]:block'
          >
            <div
              data-align={align}
              className={cn(
                'preview flex w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start',
              )}
            >
              {component}
            </div>
          </div>
          <div
            data-slot='code'
            data-active={tab === 'code'}
            className='dark:bg-black-800 hidden data-[active=true]:block **:[figure]:!m-0'
          >
            {source}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
