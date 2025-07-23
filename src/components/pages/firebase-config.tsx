"use client";

import BxTabs from "../BxTabs";
import FirebaseConfigForm from "../forms/firebase-config-form";
import PushNotificationForm from "../forms/push-notifications-form";

const FirebaseConfig = () => {
  return (
    <div className="border rounded-md p-4">
      <BxTabs
        defaultValue="firebase-config"
        tabs={[
          {
            label: "Firebase config",
            value: "firebase-config",
            content: <FirebaseConfigForm />,
          },
          {
            label: "Push Notification",
            value: "push-notification",
            content: <PushNotificationForm />,
          },
        ]}
      />
    </div>
  );
};

export default FirebaseConfig;
