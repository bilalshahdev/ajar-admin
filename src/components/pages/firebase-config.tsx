"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FirebaseConfigForm from "../forms/firebase-config-form";
import PushNotificationForm from "../forms/push-notifications-form";

const FirebaseConfig = () => {
  return (
    <div className="border rounded-md p-4">
      <Tabs defaultValue="firebase-config">
        <TabsList className="mb-4">
          <TabsTrigger value="firebase-config" className="cursor-pointer">
            Firebase config
          </TabsTrigger>
          <TabsTrigger value="push-notification" className="cursor-pointer">
            Push Notification
          </TabsTrigger>
        </TabsList>
        <TabsContent value="push-notification">
          <PushNotificationForm />
        </TabsContent>
        <TabsContent value="firebase-config">
          <FirebaseConfigForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FirebaseConfig;
