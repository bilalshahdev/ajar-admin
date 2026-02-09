"use client";
import BxTabs from "../BxTabs";
import ContactDetails from "../ContactDetails";
import Queries from "../Queries";

const HelpSupportPage = () => {
  return (
    <div className="border rounded-md p-4">
      <BxTabs
        defaultValue="queries"
        tabs={[
          {
            label: "queries",
            value: "queries",
            content: <Queries />,
          },
          {
            label: "contactDetails",
            value: "contact-details",
            content: <ContactDetails />,
          },
        ]}
      />
    </div>
  );
};

export default HelpSupportPage;
