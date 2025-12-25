"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

interface BxTabsProps {
  defaultValue: string;
  tabs: TabItem[];
  className?: string;
}

export default function BxTabs({ defaultValue, tabs, className = "" }: BxTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="cursor-pointer"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
