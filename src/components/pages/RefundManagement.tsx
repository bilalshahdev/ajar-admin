"use client";

import BxTabs from "../BxTabs";
import RefundPoliciesForm from "../forms/RefundPoliciesForm";
import RefundRequests from "./RefundRequests";

const RefundManagement = () => {
  return (
    <div className="border rounded-md p-4">
      <BxTabs
        defaultValue="refund-policies"
        tabs={[
          {
            label: "Refund Policies",
            value: "refund-policies",
            content: <RefundPoliciesForm />,
          },
          {
            label: "Refund Requests",
            value: "refund-requests",
            content: <RefundRequests />,
          },
        ]}
      />
    </div>
  );
};

export default RefundManagement;
