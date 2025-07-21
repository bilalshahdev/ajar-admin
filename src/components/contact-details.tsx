"use client";

import { contactData } from "@/config/data";
import TableActions from "./actions";
import Container from "./container";
import { DataTable } from "./custom/data-table";
import { TableCell } from "./ui/table";
import ContactDetailForm from "./forms/contact-detail-form";

const ContactDetails = () => {
  const cols = ["phone", "email", "address", "order", "actions"];

  const row = ({ phone, email, address, order, _id }: any) => (
    <>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>{order}</TableCell>
      <TableCell>
        <TableActions
          id={_id}
          baseRoute="/contact-details"
          module="Contact"
          actions={["edit", "delete"]}
          onDelete={(id) => console.log("deleted:", id)}
          deleteLoading={false}
          editDialog={{
            title: "Edit Contact",
            description: "Edit contact details",
            content: <ContactDetailForm id={_id} />,
          }}
        />
      </TableCell>
    </>
  );

  return (
    <Container
      subtitle="Contact Details"
      addBtnTitle="Contact"
      isDialog
      dialogContent={<ContactDetailForm />}
    >
      <DataTable data={contactData} cols={cols} row={row} />
    </Container>
  );
};

export default ContactDetails;
