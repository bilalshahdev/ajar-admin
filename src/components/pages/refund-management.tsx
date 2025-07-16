"use client";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import TextInput from "../forms/fields/text-input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Switch from "../forms/fields/switch";
import { Textarea } from "../ui/textarea";

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
        <TabsContent value="refund-policies">Refund Policies</TabsContent>
        <TabsContent value="refund-requests">Refund Requests</TabsContent>
      </Tabs>
    </div>
  );
};

export default RefundManagement;
