"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactDetails from "../contact-details";
import Queries from "../queries";

const HelpSupportPage = () => {
  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="queries">
        <TabsList className="mb-4">
          <TabsTrigger value="queries" className="cursor-pointer">
            Queries
          </TabsTrigger>
          <TabsTrigger value="contact-details" className="cursor-pointer">
            Contact details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="queries">
          <Queries />
        </TabsContent>
        <TabsContent value="contact-details">
          <ContactDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupportPage;
