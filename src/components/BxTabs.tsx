"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="cursor-pointer"
          >
            {t(`translation.${tab.label}`)}
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
