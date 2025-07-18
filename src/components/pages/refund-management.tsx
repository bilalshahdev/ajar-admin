"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RefundRequests from "./refund-requests";
import RefundPoliciesForm from "../forms/refund-policies-form";

const RefundManagement = () => {
  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="refund-policies">
        <TabsList className="mb-4">
          <TabsTrigger
            key="refund-policies"
            value="refund-policies"
            className="cursor-pointer"
          >
            Refund Policies
          </TabsTrigger>
          <TabsTrigger
            key="refund-requests"
            value="refund-requests"
            className="cursor-pointer"
          >
            Refund Requests
          </TabsTrigger>
        </TabsList>
        <TabsContent value="refund-policies">
          <RefundPoliciesForm />
        </TabsContent>
        <TabsContent value="refund-requests">
          <RefundRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RefundManagement;
