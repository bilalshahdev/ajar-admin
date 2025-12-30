"use client";

import BxTabs from "../BxTabs";
import FirebaseConfigForm from "../forms/FirebaseConfigForm";
import PushNotificationForm from "../forms/PushNotificationsForm";

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
