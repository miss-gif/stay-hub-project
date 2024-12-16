import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Tab {
  value: string;
  label: string;
  component: React.ReactNode;
}

interface TabsComponentProps {
  tabs: Tab[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs }) => (
  <Tabs defaultValue={tabs[0]?.value} className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2">
      {tabs.map(tab => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map(tab => (
      <TabsContent key={tab.value} value={tab.value}>
        {tab.component}
      </TabsContent>
    ))}
  </Tabs>
);

export default TabsComponent;
