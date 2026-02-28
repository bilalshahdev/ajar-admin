"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

interface BxTabsProps {
  defaultValue?: string;
  tabs: TabItem[];
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function BxTabs({ defaultValue, tabs, className = "", value, onValueChange }: BxTabsProps) {
  const t = useTranslations();
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
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