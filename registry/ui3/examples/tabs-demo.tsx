import { Tabs, Tab, TabsList, TabsPanel } from '../ui/tabs';
import { Separator } from '../ui/seprator';
import { cn } from '@/lib/utils';

export default function TabsDemo() {
  return (
    <Tabs
      defaultValue='tab1'
      className={cn('w-full max-w-md rounded-lg border')}
    >
      <TabsList className='p-2'>
        <Tab value='tab1'>Tab 1</Tab>
        <Tab value='tab2'>Tab 2</Tab>
        <Tab value='tab3'>Tab 3</Tab>
      </TabsList>
      <Separator />
      <TabsPanel value='tab1' className='p-2'>
        Content for Tab 1
      </TabsPanel>
      <TabsPanel value='tab2' className='p-2'>
        Content for Tab 2
      </TabsPanel>
      <TabsPanel value='tab3' className='p-2'>
        Content for Tab 3
      </TabsPanel>
    </Tabs>
  );
}
