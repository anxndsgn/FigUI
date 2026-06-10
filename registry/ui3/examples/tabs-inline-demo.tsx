import { Tabs, Tab, TabsList, TabsPanel } from "../ui/tabs";

export default function TabsInlineDemo() {
  return (
    <Tabs defaultValue="tab1" className="w-full max-w-64">
      <TabsList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
      </TabsList>
      <TabsPanel value="tab1" className="pt-2">
        Content for Tab 1
      </TabsPanel>
      <TabsPanel value="tab2" className="pt-2">
        Content for Tab 2
      </TabsPanel>
    </Tabs>
  );
}
