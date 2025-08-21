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
            label: "Queries",
            value: "queries",
            content: <Queries />,
          },
          {
            label: "Contact details",
            value: "contact-details",
            content: <ContactDetails />,
          },
        ]}
      />
    </div>
  );
};

export default HelpSupportPage;
